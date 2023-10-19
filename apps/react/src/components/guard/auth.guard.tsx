import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
//import { useAuth } from '../../hooks/use-auth.hook';

function AuthGuard(): JSX.Element {

  const navigate = useNavigate();
  const isAuthenticated = true; // useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login');
    }
  }, [isAuthenticated, navigate]);

  return <Outlet />
}

export default AuthGuard;