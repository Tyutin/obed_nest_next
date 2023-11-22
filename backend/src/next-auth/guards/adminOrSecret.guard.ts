import { CustomRequestInterface } from 'src/types/customRequest.interface';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminOrSecretGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<CustomRequestInterface>();
    const { user, city } = request;
    if (!user || !city) {
      return request.authBySecret;
    }
    const isAdmin =
      user.adminForCities.findIndex(
        (administatingCity) => administatingCity.id === city.id,
      ) !== -1;

    return isAdmin || request.authBySecret;
  }
}
