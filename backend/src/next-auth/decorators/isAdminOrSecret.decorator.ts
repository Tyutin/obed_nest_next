import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomRequestInterface } from '../../types/customRequest.interface';

export const IsAdminOrSecret = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<CustomRequestInterface>();
    return request.isAdminOfCity || request.authBySecret;
  },
);
