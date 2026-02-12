import { useNavigate } from 'react-router-dom';
import { userLogout } from '../services/auth.services';
import toast from 'react-hot-toast';

import { logout } from '../store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';

const ProfilePopup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const handleLogout = async () => {
    try {
      const res = await userLogout();
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(logout());
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || 'Unexpected error occurred');
      } else {
        toast.error('Unexpected error occurred');
      }
    }
  };

  return (
    <div className="bg-primary absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-lg border border-gray-200 shadow-xl">
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <FaUser className="h-4 w-4 text-gray-600" />
          <div className="flex-1">
            <p className="truncate text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
            <p className="truncate text-xs text-gray-500">{user?.email || 'No email'}</p>
          </div>
        </div>
      </div>

      <div className="py-1">
        <button className="text-secondary flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50">
          <FaUser className="h-3.5 w-3.5 text-gray-500" />
          Profile Settings
        </button>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 border-t border-gray-100 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
        >
          <FaSignOutAlt className="h-3.5 w-3.5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePopup;
