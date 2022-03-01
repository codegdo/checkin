import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsDefined,
  IsJSON,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsNumberString,
  IsObject,
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

export class UserFormDto {
  @IsNumberString()
  formId: number | string;

  @IsNumber()
  userId: number;

  @IsNumber()
  loginId: number;

  @IsNumber()
  bizId: number;
}
