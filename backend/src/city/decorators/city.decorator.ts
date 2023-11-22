import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomRequestInterface } from '../../types/customRequest.interface';

export const City = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<CustomRequestInterface>();
  if (!request.city) {
    return null;
  }
  if (data) {
    return request.city[data];
  }
  return request.city;
});
