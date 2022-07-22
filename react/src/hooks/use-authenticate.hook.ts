import { ACCESS_TOKEN } from "../app.config";
import { cookieStore, sessionStore } from "../services";

export const useAuth = (): boolean => {
  let auth = true;

  const token = sessionStore.getItem(ACCESS_TOKEN);

  const sid = cookieStore.getCookie('connect.sid');

  console.log('JWT', token);
  console.log('SID', sid);

  if (!token) {
    auth = false;
  }

  return auth;
}