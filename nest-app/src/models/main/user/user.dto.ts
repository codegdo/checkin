import { IsNotEmpty, IsString } from 'class-validator';

export class UserSignupDto {
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
