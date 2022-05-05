export const SESSION_UPDATE = 'session/SESSION_UPDATE';
export const SESSION_DELETE = 'session/SESSION_DELETE';

export interface SessionState {
  isLogin?: boolean;
  user?: { [x: string]: string | number | boolean } | null;
  locationId?: number | null;
  orgId?: number | null;
}
