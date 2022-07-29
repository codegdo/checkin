import { useSelector } from 'react-redux';
import { ACCESS_TOKEN } from "../app.config";
import { cookieStore, sessionStore } from "../services";
import { AppState } from '../store/reducers';

export const useAuth = (): { [key: string]: boolean } => {
  const { user } = useSelector((state: AppState) => state.session);
  let auth = false;

  const token = sessionStore.getItem(ACCESS_TOKEN);

  const sid = cookieStore.getCookie('connect.sid');

  console.log('JWT', token);
  console.log('SID', sid);

  if (!token) {
    auth = false;
  }

  if (user && user.isActive) {
    auth = true;
  }

  return { auth };
}