import {
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';

import { JwtPayloadWithRt } from 'src/auth/types';

export const GetCurrentUser = createParamDecorator(
  (
    data: keyof JwtPayloadWithRt | undefined,
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest();
    if (data) return request.user[data];
    return request.user;
  },
);
