import { ACCESS_TOKEN } from "../app.config";
import { sessionStore } from "../services";

export const useAuth = (): boolean => {
  let auth = true;

  const token = sessionStore.getItem(ACCESS_TOKEN);

  if (!token) {
    auth = false;
  }



  return auth;
}