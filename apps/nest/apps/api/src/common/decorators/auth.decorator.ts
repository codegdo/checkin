import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enums';
import { AUTH_KEY } from '../constants';

export const Auth = (...auth: AuthType[]) => SetMetadata(AUTH_KEY, auth);
