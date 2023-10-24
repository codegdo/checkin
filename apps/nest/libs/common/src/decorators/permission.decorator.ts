import { SetMetadata } from '@nestjs/common';

import { PermissionType } from '../types';
import { PERMISSION_KEY } from '../constants';


export const Permissions = (...permission: PermissionType[]) =>
  SetMetadata(PERMISSION_KEY, permission);
