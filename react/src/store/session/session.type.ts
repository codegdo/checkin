export const UPDATE_SESSION = 'session/UPDATE_SESSION';
export const DELETE_SESSION = 'session/DELETE_SESSION';

export interface SessionState {
  isLogin?: boolean;
  user?: { [x: string]: string | number | boolean } | null;

  storeId?: number | null;
  bizId?: number | null;
  accessToken?: string | null;
}
