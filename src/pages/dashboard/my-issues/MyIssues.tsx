import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteIssue, getMyIssues } from '../../../services/issueservice';
import type {
  AllIssuePageProps,
  PaginationProps,
  QueryProps,
} from '../../../utils/interfaces/issueInterface';
import { PriorityBadge, StatusBadge } from '../../../utils/helpers/issueBadge';
import Filters from '../../../components/Filters';
import { useDebounce } from '../../../utils/hooks/useDebounsehook';
import { MdDeleteOutline } from 'react-icons/md';
import { FiEdit2 } from 'react-icons/fi';
import { GrCircleInformation } from 'react-icons/gr';
import PopUpModalComponent from '../../../components/PopUpModalComponent';
import Pagination from '../../../components/Pagination';

const MyIssues = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AllIssuePageProps[]>([]);
  const [query, setQuery] = useState<QueryProps>({
    search: '',
    status: '',
    priority: '',
    severity: '',
    assignedToName: null,
    createdById: null,
    page: 1,
    limit: 20,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<{
    id: string;
    isOpen: boolean;
  }>({
    id: '',
    isOpen: false,
  });
  const [page, setPage] = useState<PaginationProps>({
    total: 0,
    page: 1,
    limit: 20,
  });
  const debounced = useDebounce(400, query.search);
  useEffect(() => {
    fetchData();
  }, [
    debounced,
    query.status,
    query.priority,
    query.severity,
    query.assignedToName,
    query.page,
    query.sortBy,
    query.sortOrder,
  ]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getMyIssues(query);
      if (res.status) {
        setData(res.data.data);
        setPage(res.data.meta);
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteIssue = async (id: string) => {
    try {
      setLoading(true);
      const res = await deleteIssue(id);
      if (res.data.success) {
        toast.success(res.data.message);
        setIsDeletePopupOpen({
          id: '',
          isOpen: false,
        });
        fetchData();
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full space-y-4 pb-24">
      <header className="flex flex-col gap-3">
        <h5 className="text-xs text-slate-500 uppercase">
          {pathname.substring(1).split('/').join(' / ')}
        </h5>
      </header>
      <section>
        <Filters query={query} setQuery={setQuery} />
      </section>
      <section>
        <table className="tableoutline">
          <thead className="tablehead">
            <tr>
              <th className="tableheadcell">Issue</th>
              <th className="tableheadcell">Status</th>
              <th className="tableheadcell">Priority</th>
              <th className="tableheadcell">Assignee</th>
              <th className="tableheadcell">Due Date</th>
              <th className="tableheadcell">Created</th>
              <th className="tableheadcell">Actions</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {loading ? (
              [...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td colSpan={7} className="p-4">
                    <div className="h-6 w-full animate-pulse rounded bg-slate-200"></div>
                  </td>
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-sm text-slate-500">
                  No issues found.
                </td>
              </tr>
            ) : (
              data.map((item, key) => (
                <tr key={key}>
                  <td className="tabledata">{item.title ?? '-'}</td>
                  <td className="tabledata">{<StatusBadge status={item.status} />}</td>
                  <td className="tabledata">{<PriorityBadge priority={item.priority} />}</td>
                  <td className="tabledata">{item.assignedToName ?? '-'}</td>
                  <td className="tabledata">
                    {item.dueDate ? new Date(item.dueDate).toLocaleDateString() : '-'}
                  </td>
                  <td className="tabledata">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-'}
                  </td>
                  <td className="tabledata flex flex-row items-center justify-start gap-3">
                    <button
                      className="cursor-pointer"
                      onClick={() => navigate(`/dashboard/issues/view/${item.id}`)}
                    >
                      <GrCircleInformation />
                    </button>
                    <button
                      className="cursor-pointer"
                      onClick={() => navigate(`/dashboard/issues/edit/${item.id}`)}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className="cursor-pointer"
                      onClick={() =>
                        setIsDeletePopupOpen({
                          id: item.id,
                          isOpen: true,
                        })
                      }
                    >
                      <MdDeleteOutline />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
      <section className="flex w-full flex-row items-center justify-center p-3">
        <Pagination
          currentPage={page.page}
          totalPages={Math.ceil(page.total / page.limit)}
          onPageChange={(page) => {
            setQuery((prev) => ({ ...prev, page }));
          }}
        />
      </section>
      {isDeletePopupOpen.isOpen && (
        <PopUpModalComponent
          isOpen={isDeletePopupOpen.isOpen}
          title="Delete Issue"
          onClose={() =>
            setIsDeletePopupOpen({
              id: '',
              isOpen: false,
            })
          }
          onConfirm={() => handleDeleteIssue(isDeletePopupOpen.id)}
          confirmText={loading ? 'Deleting...' : 'Delete'}
          cancelText="Cancel"
        >
          <span>Are you sure you want to delete this issue?</span>
        </PopUpModalComponent>
      )}
    </div>
  );
};

export default MyIssues;
