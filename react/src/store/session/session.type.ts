export const UPDATE_SESSION = 'session/UPDATE_SESSION';
export const DELETE_SESSION = 'session/DELETE_SESSION';

export interface SessionState {
  loggedIn: boolean;
  user: { [x: string]: string | number | boolean } | null;
  orgId: string | number | null;
}
