import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { AppState } from '@/store/reducers';

function AuthGuard(): JSX.Element {
  const session = useSelector((state: AppState) => state.session);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session.isAuth) {
      navigate('/auth/login');
    }
  }, [session, navigate, pathname]);

  return <Outlet />
}

export default AuthGuard;