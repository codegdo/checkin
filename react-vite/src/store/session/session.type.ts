export interface SessionState {
  isLoggedin?: boolean;
  user?: { [x: string]: string | number | boolean } | null;
  locationId?: number | null;
  orgId?: number | null;
}
