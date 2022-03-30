import { SetMetadata } from '@nestjs/common';

export const IS_RESTRICT_KEY = 'isPrivate';

export const Restrict = () => SetMetadata(IS_RESTRICT_KEY, true);
