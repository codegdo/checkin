import { useState } from 'react';
//import { useSelector } from 'react-redux';
//import { AppStatus } from '../constants';
//import { AppState } from '../store/reducers';

export const useAuth = (): boolean => {
  //const { appStatus } = useSelector((state: AppState) => state.status);
  const [isAuth] = useState(false);

  // useEffect(() => {
  //   appStatus === AppStatus.ACTIVE && setAuth(true);
  // }, [appStatus]);

  return isAuth;
};
