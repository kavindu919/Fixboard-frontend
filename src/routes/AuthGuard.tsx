import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../components/Loader';

const AuthGuard = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  useEffect(() => {
    handleAuth();
  }, []);
  const handleAuth = async () => {
    try {
      const res = await axiosInstance.get('/auth/me');
      if (res.data.success) {
        setIsAuth(true);
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
