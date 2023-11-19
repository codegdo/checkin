import { AppStatus } from '@/constants';

export interface SessionData {
  status: AppStatus;
  accessType: string | null;
  clientId: number | null | undefined; // company_id
  isAuth: boolean;
}
