import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { TokenData } from '../token/token.dto';


export type TokenVerifyData = {
  username: string;
  emailAddress: string;
  phoneNumber: string;
}

export type VerifyUserData = TokenData;

export type ConfirmUserData = {
  isActive: boolean;
}

export type SignupUserData = {
  username: string;
  emailAddress: string;
  phoneNumber: string;
  isActive: boolean;
}

export type LoginUserData = {
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

export class UserData {
  @Expose()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  emailAddress: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  username: string;

  @Exclude()
  password: string;

  @Expose()
  roleId: number;

  @Expose()
  roleType: string;

  @Expose()
  orgId: number;

  @Expose()
  orgActive: boolean;

  @Expose()
  isActive: boolean;

  @Expose()
  isOwner: boolean;
}

export class SignupUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  emailAddress: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class LoginUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class VerifyUserDto {
  @IsString()
  verification: string;

  @IsString()
  username: string;
}

export class CreateUserDto {
  @IsString()
  emailAddress: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsNumber()
  roleId: number;

  @IsNumber()
  orgId: number;
}

export class UpdateUserDto {
  @IsString()
  emailAddress: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsNumber()
  roleId: number;

  @IsNumber()
  orgId: number;
}