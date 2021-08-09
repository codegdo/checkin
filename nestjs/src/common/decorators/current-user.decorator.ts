import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from 'express';

export const CurrentUser = createParamDecorator((data: never, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<Request>();

  return request.session.user;
});
