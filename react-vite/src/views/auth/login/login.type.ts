export interface LoginData {
  user: {
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
  };
}

