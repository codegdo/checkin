export enum AccessType {
  SYSTEM = 'system',
  INTERNAL = 'internal',
  EXTERNAL = 'external',
  PUBLIC = 'public',
}


export interface UserData {
  id?: number;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  phoneNumber?: string;
  username?: string;
  role?: string;
  roleType?: string;
  companyId?: number;
  isOwner?: boolean;
  isActive?: boolean;
}
