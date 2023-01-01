import { CustomDecorator, SetMetadata } from '@nestjs/common';
import {
  PermissionAction,
  PermissionSubject,
} from 'src/services/casl/action.type';
// action, object
export type PermissionType = [PermissionAction, PermissionSubject];
export const PERMISSION_KEY = 'permission_key';

export const Permission = (
  ...params: PermissionType[]
): CustomDecorator<string> => SetMetadata(PERMISSION_KEY, params);
