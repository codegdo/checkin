import { TokenData } from '../token/token.type';
import { UserQueryDto } from './user.dto';

export type UserData = {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  username: string;
  password?: string;
  roleId: number;
  roleType: string;
  orgId: number;
  orgActive?: boolean;
  isActive: boolean;
  isOwner: boolean;
};

export type UserSignupData = {
  id: number;
  username: string;
  emailAddress: string;
  phoneNumber: string;
  isActive: boolean;
} | null;

export type VerifyData = {
  firstName: string;
  lastName: string;
  username: string;
  emailAddress: string;
  phoneNumber: string;
} | null;

export type UserVerifyData = TokenData<VerifyData> | null;

export type UserSetupData = {
  user: UserData;
  locations: any[];
  organizations: any[];
  permissions: any[];
  modules: any[];
  policies: any;
  nav: any;
} | null;

export type UserLoginData = {
  user: UserData;
  locations: any[];
  organizations: any[];
  permissions: any[];
  modules: any[];
  policies: any;
  nav: any;
} | null;

export type UserSession = {
  sessionId: string;
  loginId: number;
  orgId: number;
  locationId: number;
  groupType: string;
  groupLevel: number;
  isOwner: boolean;
}

export type UserQueryAll = {
  user: UserSession,
  query: UserQueryDto
}