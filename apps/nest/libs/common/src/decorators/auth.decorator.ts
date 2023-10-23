import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enums';

export const AUTH_KEY = 'auth';
export const Auth = (...auth: AuthType[]) => SetMetadata(AUTH_KEY, auth);
