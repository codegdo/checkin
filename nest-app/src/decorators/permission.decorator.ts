import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'permission_key';

export const Permission = <T>(
  ...params: [T, string | string[]][]
): CustomDecorator<string> => SetMetadata(PERMISSION_KEY, params);
