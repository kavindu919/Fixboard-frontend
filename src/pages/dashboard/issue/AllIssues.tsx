import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Filters from '../../../components/Filters';
import Pagination from '../../../components/Pagination';
import { deleteIssue, exportIssue, getAllIssues } from '../../../services/issueservice';
import toast from 'react-hot-toast';
import type {
  AllIssuePageProps,
  PaginationProps,
  QueryProps,
} from '../../../utils/interfaces/issueInterface';
import { FiEdit2 } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import PopUpModalComponent from '../../../components/PopUpModalComponent';
import { GrCircleInformation } from 'react-icons/gr';
import { PriorityBadge, StatusBadge } from '../../../utils/helpers/issueBadge';
import { useDebounce } from '../../../utils/hooks/useDebounsehook';
import FormDropdown from '../../../components/FormDropdown';

const AllIssues = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<{
    id: string;
    isOpen: boolean;
  }>({
    id: '',
    isOpen: false,
  });
  const [loading, setLoading] = useState<boolean>(false);

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
  const [page, setPage] = useState<PaginationProps>({
    total: 0,
    page: 1,
    limit: 20,
  });
  const [data, setData] = useState<AllIssuePageProps[]>([]);
  const [exportType, setExportType] = useState<string>('');

  const debounced = useDebounce(400, query.search);

  useEffect(() => {
    fetchData();
  }, [
    debounced,
    query.status,
    query.priority,
    query.severity,
    query.assignedToName,
    query.createdById,
    query.page,
    query.limit,
    query.sortBy,
    query.sortOrder,
  ]);

  const fetchData = async () => {
    try {
      const res = await getAllIssues(query);
      if (res.data.success) {
        setData(res.data.data);
        setPage(res.data.meta);
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Unexpected error occurred');
      }
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

  const handleExport = async (exportValue: string) => {
    try {
      await exportIssue(exportValue);
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Unexpected error occurred');
      }
    }
  };

  return (
    <div className="h-full w-full space-y-4 pb-24">
      <div className="flex w-full flex-row items-center justify-between">
        <header className="flex flex-col gap-3">
          <h5 className="text-xs text-slate-500 uppercase">
            {pathname.substring(1).split('/').join(' / ')}
          </h5>
        </header>
        <Link
          to="/dashboard/issues/create"
          className="bg-secondary inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Create Issue
        </Link>
      </div>

      <section className="flex flex-row gap-3">
        <Filters query={query} setQuery={setQuery} />
        <div>
          <FormDropdown
            label="Export As"
            name="export_as"
            value={exportType}
            options={[
              { value: 'json', label: 'JSON' },
              { value: 'csv', label: 'CSV' },
            ]}
            onChange={(e) => {
              const value = e.target.value;
              setExportType(value);
              handleExport(value);
            }}
            placeholder="Select an Option"
          />
        </div>
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
            {data.map((data, key) => (
              <tr key={key}>
                <td className="tabledata">{data.title ?? '-'}</td>
                <td className="tabledata">
                  <StatusBadge status={data.status} />
                </td>
                <td className="tabledata">
                  {' '}
                  <PriorityBadge priority={data.priority} />{' '}
                </td>
                <td className="tabledata">{data.assignedToName ?? '-'}</td>
                <td className="tabledata">
                  {data.dueDate ? new Date(data.dueDate).toLocaleDateString() : '-'}
                </td>
                <td className="tabledata">
                  {data.createdAt ? new Date(data.createdAt).toLocaleDateString() : '-'}
                </td>

                <td className="tabledata flex flex-row items-center justify-center gap-3">
                  <button
                    className="cursor-pointer"
                    onClick={() => navigate(`/dashboard/issues/view/${data.id}`)}
                  >
                    <GrCircleInformation />
                  </button>
                  <button
                    className="cursor-pointer"
                    onClick={() => navigate(`/dashboard/issues/edit/${data.id}`)}
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    className="cursor-pointer"
                    onClick={() =>
                      setIsDeletePopupOpen({
                        id: data.id,
                        isOpen: true,
                      })
                    }
                  >
                    <MdDeleteOutline />
                  </button>
                </td>
              </tr>
            ))}
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
          isOpen={loading}
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

export default AllIssues;
