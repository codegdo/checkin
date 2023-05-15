import { SetMetadata } from '@nestjs/common';
import { AccessLevel } from 'src/constants';

export const ACCESS_KEY = 'access_key';
export const Access = (...access: AccessLevel[]) =>
  SetMetadata(ACCESS_KEY, access);
