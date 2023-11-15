import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { AppState } from '@/store/reducers';

function AuthGuard(): JSX.Element {
  const status = useSelector((state: AppState) => state.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (!status.isLoggedIn) {
      navigate('/auth/login');
    }
  }, [status, navigate]);

  return <Outlet />
}

export default AuthGuard;