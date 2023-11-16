import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { AppState } from '@/store/reducers';

function AuthGuard(): JSX.Element {
  const session = useSelector((state: AppState) => state.session);
  const navigate = useNavigate();

  useEffect(() => {
    if (!session.isLoggedIn) {
      navigate('/auth/login');
    }
  }, [session, navigate]);

  return <Outlet />
}

export default AuthGuard;