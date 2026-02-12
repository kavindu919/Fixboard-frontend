import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../components/Loader';
import { useAppDispatch, useAppSelector } from '../store/store';
import { login } from '../store/slices/authSlice';

const AuthGuard = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (user) {
      setIsAuth(true);
    } else {
      handleAuth();
    }
  }, [user]);
  const handleAuth = async () => {
    try {
      const res = await axiosInstance.get('/auth/me');
      if (res.data.success) {
        setIsAuth(true);
        dispatch(
          login({
            id: res.data.user.id,
            name: res.data.user.name,
            email: res.data.user.email,
          }),
        );
      } else {
        setIsAuth(false);
      }
    } catch (error) {
      setIsAuth(false);
    }
  };
  if (isAuth === null) {
    return <Loader />;
  }
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthGuard;
