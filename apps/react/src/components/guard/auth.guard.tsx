import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { AppState } from '@/store/reducers';

function AuthGuard(): JSX.Element {
  const isAuth = useSelector((state: AppState) => state.session.isAuth);
  //const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/auth/login');
    }
  }, [isAuth, navigate]);

  return <Outlet />
}

export default AuthGuard;