import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export enum TokenTypeEnum {
  VERIFY = 'verify'
}

export class TokenData {
  id: string;
  key: string;
  type: string;
  data: string;
  expiredAt: number;
}
