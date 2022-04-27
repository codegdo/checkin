import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsDefined,
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsNumberString,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class UserSignupDto {
  //@IsObject()
  //@ValidateNested({ each: true })
  //@Type(() => SignupFormData)
  //data: SignupFormData

  @IsNotEmpty()
  @IsString()
  formName: string;

  @IsJSON()
  @IsNotEmpty()
  @IsString()
  data: string;
}

class FormDataDto {
  @IsString()
  option: string;
}

export class UserVerifyDto {
  @IsNumber()
  loginId: number;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => FormDataDto)
  data: FormDataDto;
}

export class UserSetupDto {
  @IsNumber()
  loginId: number;

  @IsJSON()
  @IsNotEmpty()
  @IsString()
  data: string;
}

export class UserLoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class UserCreateDto {

  @IsJSON()
  @IsNotEmpty()
  @IsString()
  data: string;

  @IsNumber()
  formId: number;

  @IsNumber()
  userId: number;

  @IsNumber()
  @IsOptional()
  loginId: number;

}

export class UserQueryDto {

  @IsOptional()
  username: string;

  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  emailAddress: string;

  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  location: string;

  @IsOptional()
  group: string;

  @IsOptional()
  type: string;

  @IsOptional()
  isActive: string;

  @IsOptional()
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsNumber()
  offset: number;

  @IsOptional()
  sortColumn: string;

  @IsOptional()
  sortDirection: string;
}

