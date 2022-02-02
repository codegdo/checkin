import { TokenData } from '../token/token.dto';

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
  username: string;
  orgId: string;
  locationId: string;
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