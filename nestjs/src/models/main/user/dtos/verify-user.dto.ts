import { IsString } from 'class-validator';
import { VerifyTokenData } from '../../interfaces';

export class VerifyUserDto {
  @IsString()
  username: string;

  @IsString()
  key: string;

  data: VerifyTokenData;

  @IsString()
  expiredAt: number;
}