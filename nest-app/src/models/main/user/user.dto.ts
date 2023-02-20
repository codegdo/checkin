import { Type } from 'class-transformer';
import {
  IsEmail,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class UserSignupDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  emailAddress: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsNumber()
  groupId: number;
}

export interface UserSignupData {
  id: number;
  username: string;
  phoneNumber: string;
  emailAddress: string;
  isActive: boolean;
}

export interface UserLoginData {
  user: object;
}

export class UserSignupBody {
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => UserSignupDto)
  data: UserSignupDto;
}

export class UserLoginDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export enum AccessLevelEnum {
  System = 'system',
  Internal = 'internal',
  External = 'external'
}
