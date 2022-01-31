import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export enum TokenEnum {
  VERIFY = 'verify',
}

export class TokenData<T> {
  id: string;
  key: string;
  type: string;
  data: T;
  expiredAt: number;
}
