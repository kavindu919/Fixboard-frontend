import { useNavigate } from 'react-router-dom';
import { userLogout } from '../services/auth.services';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const ProfilePopup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    <div className="bg-primary absolute right-0 mt-1 w-24 rounded-lg border border-slate-300 shadow-lg">
      <div className="flex flex-col items-center justify-center py-1 text-left">
        <button className="text-secondary cursor-pointer px-4 py-2 text-left text-sm transition-colors hover:bg-gray-100">
          Profile
        </button>
        <button
          onClick={() => handleLogout()}
          className="text-secondary cursor-pointer px-4 py-2 text-left text-sm transition-colors hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePopup;
