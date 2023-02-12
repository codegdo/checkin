import { useSelector } from 'react-redux';
import { AppState } from '../store/reducers';

export const useAuth = (): boolean => {
  const { user } = useSelector((state: AppState) => state.session);
  let auth = false;

  if (user) {
    auth = true;
  }

  return auth;
};
