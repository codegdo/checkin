import { SetMetadata } from '@nestjs/common';

export const IS_RESTRICTED_KEY = 'isRestricted';

export const Restricted = () => SetMetadata(IS_RESTRICTED_KEY, true);
