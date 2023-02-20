import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppStatus } from '../constants';
import { AppState } from '../store/reducers';

export const useAuth = (): boolean => {
  const { status } = useSelector((state: AppState) => state.session);
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    status === AppStatus.ACTIVE && setAuth(true);
  }, [status]);

  return isAuth;
};
