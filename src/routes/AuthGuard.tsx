import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  useEffect(() => {
    handleAuth();
  }, []);
  const handleAuth = async () => {
    try {
      const res = await axiosInstance.get('/auth/me');
      if (res.data.success) {
        console.log(res.data.sccess);
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    } catch (error) {
      setIsAuth(false);
    }
  };
  if (isAuth === null) {
    return <div>Checking authentication...</div>;
  }
  console.log('isAuth', isAuth);
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthGuard;
