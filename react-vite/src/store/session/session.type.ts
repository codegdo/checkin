export interface SessionState {
  loggedIn?: boolean;
  user?: { [x: string]: string | number | boolean } | null;
}
