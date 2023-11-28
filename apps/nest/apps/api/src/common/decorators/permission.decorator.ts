import { SetMetadata } from '@nestjs/common';

import { ActionType } from '../actions';
import { PERMISSION_KEY } from '../constants';

export const Permissions = (...action: ActionType[]) =>
  SetMetadata(PERMISSION_KEY, action);
