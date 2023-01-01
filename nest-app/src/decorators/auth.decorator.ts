import { SetMetadata } from '@nestjs/common';
import { AuthType } from 'src/types/auth.enum';

export const AUTH_TYPE_KEY = 'auth_type_key';

export const Auth = (...authTypes: AuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);
