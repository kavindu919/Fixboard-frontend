import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllTeam, removeUser } from '../../../services/userservices';
import toast from 'react-hot-toast';
import type { UserProps } from '../../../utils/interfaces/userinterface';
import { RoleBadge } from '../../../utils/helpers/issueBadge';
import { FiEdit2 } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import PopUpModalComponent from '../../../components/PopUpModalComponent';

const ManageTeam = () => {
  const { pathname } = useLocation();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<UserProps[]>([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<{
    id: string;
    isOpen: boolean;
  }>({
    id: '',
    isOpen: false,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllTeam();
      if (res.data.success) {
        setData(res.data.data);
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
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeleteUser = useCallback(async () => {
    try {
      setLoading(true);
      const res = await removeUser(isDeletePopupOpen.id);
      if (res.data.success) {
        toast.success(res.data.message);
        setIsDeletePopupOpen({
          isOpen: false,
          id: '',
        });
        setData((prev) => prev.filter((item) => item.id !== isDeletePopupOpen.id));
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
  }, [isDeletePopupOpen.id, fetchData]);

  return (
    <div className="h-full w-full space-y-4 pb-24">
      <header className="flex flex-col gap-3">
        <h5 className="text-xs text-slate-500 uppercase">
          {pathname.substring(1).split('/').join(' / ')}
        </h5>
      </header>
      <section>
        <table className="tableoutline">
          <thead className="tablehead">
            <tr>
              <th className="tableheadcell">Name</th>
              <th className="tableheadcell">Email</th>
              <th className="tableheadcell">Role</th>
              <th className="tableheadcell">Created At</th>
              <th className="tableheadcell">Action</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {loading ? (
              [...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td colSpan={5} className="p-4">
                    <div className="h-6 w-full animate-pulse rounded bg-slate-200"></div>
                  </td>
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-sm text-slate-500">
                  No member found.
                </td>
              </tr>
            ) : (
              data.map((item, key) => (
                <tr key={key}>
                  <td className="tabledata">{item.name ?? '-'}</td>
                  <td className="tabledata">{item.email ?? '-'}</td>
                  <td className="tabledata">{RoleBadge(item.role) ?? '-'}</td>
                  <td className="tabledata">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-'}
                  </td>
                  <td className="tabledata flex flex-row items-center justify-start gap-3">
                    <button className="cursor-pointer">
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
      {isDeletePopupOpen.isOpen && (
        <PopUpModalComponent
          isOpen={isDeletePopupOpen.isOpen}
          title="Remove User"
          onClose={() =>
            setIsDeletePopupOpen({
              id: '',
              isOpen: false,
            })
          }
          onConfirm={() => handleDeleteUser()}
          confirmText={loading ? 'Deleting...' : 'Delete'}
          cancelText="Cancel"
        >
          <span>Are you sure you want to remove this team member?</span>
        </PopUpModalComponent>
      )}
    </div>
  );
};

export default ManageTeam;
