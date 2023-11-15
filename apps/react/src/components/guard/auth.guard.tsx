import { useAction } from '@/hooks';
import { AppState } from '@/store/reducers';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

function AuthGuard(): JSX.Element {
  const { status, user } = useSelector((state: AppState) => state);
  const { updateStatus } = useAction();
  const navigate = useNavigate();

  useEffect(() => {
    if (!status.isLoggedIn) {
      navigate('/auth/login');
      //updateStatus({ isLoggedIn: true, current: AppStatus.ACTIVE });
    }
  }, [status, navigate]);

  useEffect(() => {
    if (user) {
      console.log(user);
      //updateStatus({ isLoggedIn: true, current: AppStatus.ACTIVE });
    }
  }, [user]);

  return <Outlet />
}

export default AuthGuard;