import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../store/reducers';
import { UserStatus } from '../store/types';

export const useAuth = (): boolean => {
  const { status } = useSelector((state: AppState) => state.session);
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    (status === UserStatus.ACTIVE) && setAuth(true);
  }, [status]);

  return isAuth;
};
