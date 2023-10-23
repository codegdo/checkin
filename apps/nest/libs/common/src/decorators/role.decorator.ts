import { SetMetadata } from '@nestjs/common';

import { RoleType } from '../enums';

export const ROLE_KEY = 'roles';
export const Roles = (...role: RoleType[]) => SetMetadata(ROLE_KEY, role);
