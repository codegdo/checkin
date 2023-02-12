export interface SessionState {
  user?: { [x: string]: string | number | boolean } | null;
}
