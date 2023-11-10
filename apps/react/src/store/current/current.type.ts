import { AppStatus } from '@/constants';

export interface CurrentState {
  appId?: number | null;
  status?: AppStatus;
}