import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { PermissionAction, PermissionSubject } from 'src/services/casl/casl-action.type';

export const PERMISSION_KEY = 'permission_key';
export type PermissionType = [PermissionAction, PermissionSubject];

export const Permission = (
  ...params: PermissionType[]
): CustomDecorator<string> => SetMetadata(PERMISSION_KEY, params);
