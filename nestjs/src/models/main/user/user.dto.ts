import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsDefined,
  IsJSON,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TokenData } from '../token/token.dto';

export type TokenVerifyData = {
  username: string;
  emailAddress: string;
  phoneNumber: string;
};

export type VerifyUserData = TokenData<any>;

export type ConfirmUserData = {
  isActive: boolean;
};

export type SignupUserData = {
  id: number;
  username: string;
  emailAddress: string;
  phoneNumber: string;
  isActive: boolean;
};

export type SetupUserData = {
  username: string;
  orgId: string;
  locationId: string;
};

export type LoginUserData =
  | {
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
    }
  | null
  | undefined;

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

export class SignupFormData {
  firstName: string;

  lastName: string;

  emailAddress: string;

  phoneNumber: string;

  username: string;

  password: string;
}

export class SignupUserDto {
  //@IsObject()
  //@ValidateNested({ each: true })
  //@Type(() => SignupFormData)
  //data: SignupFormData

  @IsJSON()
  @IsNotEmpty()
  @IsString()
  data: string;
}

export class LoginUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class VerifyUserDto {
  @IsString()
  verifyOption: string;

  @IsString()
  username: string;
}

export class SetupUserDto {
  @IsString()
  username: string;

  @IsString()
  orgName: string;

  @IsString()
  subdomain: string;

  @IsString()
  locationName: string;

  @IsString()
  streetAddress: string;

  @IsString()
  country: string;

  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsString()
  postalCode: string;
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
