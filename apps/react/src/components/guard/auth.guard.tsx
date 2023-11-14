import { AppState } from '@/store/reducers';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

function AuthGuard(): JSX.Element {
  const { isLoggedIn } = useSelector((state: AppState) => state.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth/login');
    }
  }, [isLoggedIn, navigate]);

  return <Outlet />
}

export default AuthGuard;