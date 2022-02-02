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

export class UserSignupDto {
  //@IsObject()
  //@ValidateNested({ each: true })
  //@Type(() => SignupFormData)
  //data: SignupFormData

  @IsJSON()
  @IsNotEmpty()
  @IsString()
  data: string;
}

class UserVerifyDataDto {
  @IsString()
  option: string;
}

export class UserVerifyDto {
  @IsNumber()
  loginId: number;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => UserVerifyDataDto)
  data: UserVerifyDataDto
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
