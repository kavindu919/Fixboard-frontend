import { Link, useLocation, useNavigate } from 'react-router-dom';
import StatCard from '../../../components/StatCard';
import { useEffect, useState } from 'react';
import Filters from '../../../components/Filters';
import Pagination from '../../../components/Pagination';
import { getAllIssues } from '../../../services/issueservice';
import toast from 'react-hot-toast';
import type {
  AllIssuePageProps,
  PaginationProps,
  QueryProps,
} from '../../../utils/interfaces/issueInterface';
import { FiEdit2 } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';

const AllIssues = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchData();
  }, [query]);

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

  return (
    <div className="h-full w-full space-y-4 pb-24">
      <div className="flex w-full flex-row items-center justify-between">
        <header className="flex flex-col gap-3">
          <h5 className="text-xs text-slate-500 uppercase">
            {pathname.substring(1).split('/').join(' / ')}
          </h5>
        </header>
        <Link
          to="/issues/create"
          className="bg-secondary hover:bg-accent/90 focus-visible:ring-accent inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Create Issue
        </Link>
      </div>
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Open" value="10" />
        <StatCard label="In Progress" value="12" />
        <StatCard label="Resolved" value="3" />
        <StatCard label="Closed" value="1" />
      </section>
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
            {data.map((data, key) => (
              <tr key={key}>
                <td className="tabledata">{data.title ?? '-'}</td>
                <td className="tabledata">{data.status ?? '-'}</td>
                <td className="tabledata">{data.priority ?? '-'}</td>
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
                    onClick={() => navigate(`/issues/edit/${data.id}`)}
                  >
                    <FiEdit2 />
                  </button>
                  <button className="cursor-pointer">
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
    </div>
  );
};

export default AllIssues;
