import { SetMetadata } from '@nestjs/common';

import { RoleType } from '../enums';
import { ROLE_KEY } from '../constants';

export const Roles = (...role: RoleType[]) => SetMetadata(ROLE_KEY, role);
