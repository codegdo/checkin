import { UserStatus } from '../../constants';

export interface SessionState {
  loggedIn?: boolean;
  status?: UserStatus;
  user?: UserData;
}

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  username: string;
  accessLevel: string;
  groupLevel: number;
  accountId: number;
  isOwner: boolean;
  isActive: boolean;
}
