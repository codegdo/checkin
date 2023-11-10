import { AppStatus } from '@/constants';

export interface SessionState {
  loggedIn?: boolean;
  status?: AppStatus;
  user?: UserData;
}

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  username: string;
  role: string;
  group: number;
  accountId: number;
  isOwner: boolean;
  isActive: boolean;
}
