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

export enum UserStatus {
  REQUIRE_AUTH = 'ACCOUNT_REQUIRE_AUTH',
  ACTIVE = 'ACCOUNT_ACTIVE',
  INACTIVE = 'ACCOUNT_INACTIVE',
  REQUIRE_SETUP_COMPLETE = 'ACCOUNT_REQUIRE_SETUP_COMPLETE',
  REQUIRE_VERIFY = 'ACCOUNT_REQUIRE_VERIFY'
}

// user-pending
// user-incomplete
// user-trial
// user-expire
// user-active
// user-inactive
// user-disabled

