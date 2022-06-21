export const SESSION_UPDATE = 'session/UPDATE';
export const SESSION_DELETE = 'session/DELETE';

export interface SessionState {
  isLogin?: boolean;
  user?: { [x: string]: string | number | boolean } | null;
  locationId?: number | null;
  orgId?: number | null;
}
