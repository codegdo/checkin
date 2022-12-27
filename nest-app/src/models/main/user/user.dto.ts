import { IsNotEmpty, IsString } from 'class-validator';

export class UserSignupDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  emailAddress: string;

  @IsString()
  phoneNumber: string;
}
