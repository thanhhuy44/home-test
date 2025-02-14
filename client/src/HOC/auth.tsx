import { ReactNode } from 'react';
import { useAuth } from '../store/auth';
import { Navigate } from 'react-router-dom';

function RequiredAuth({ children }: { children: ReactNode }) {
  const { isLogin } = useAuth();
  return isLogin ? children : <Navigate to="/login" />;
}

export default RequiredAuth;
