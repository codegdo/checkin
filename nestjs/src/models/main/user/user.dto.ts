import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export type TokenVerifyData = {
  username: string;
  emailAddress: string;
  phoneNumber: string;
}

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