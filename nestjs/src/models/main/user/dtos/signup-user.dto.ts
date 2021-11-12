import { IsString } from 'class-validator';
import { SignupTokenData } from '../../interfaces';

export class SignupUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  emailAddress: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  data: SignupTokenData;

  expiredAt: number;
}