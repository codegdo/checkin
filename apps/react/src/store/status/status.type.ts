import { AppStatus } from '@/constants';

export interface StatusState {
  appId?: number | null;
  clientId: number | null;
  current: AppStatus;
  isLoggedIn: boolean;
  userType: string | null;
}