import { TokenData } from '../token/token.type';

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
}

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
  user: UserData,
  workspaces: any[]
} | null;

export type UserLoginData = {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  username: string;
  password: string;
  roleId: number;
  roleType: string;
  orgId: number;
  orgActive: boolean;
  isActive: boolean;
  isOwner: boolean;
} | null | undefined;