import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { USER_KEY } from '../constants';

export const CurrentUser = createParamDecorator(
  (key: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request[USER_KEY];
    return key ? user?.[key] : user;
  },
);
