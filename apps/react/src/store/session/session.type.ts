import { AppStatus } from '@/constants';

export interface SessionState {
  appId: number | null;
  clientId: number | null;
  status: AppStatus;
  isLoggedIn: boolean;
  userType: string | null;
}
