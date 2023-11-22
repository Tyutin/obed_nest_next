import { Injectable, NestMiddleware } from '@nestjs/common';
import { CustomRequestInterface } from '../../types/customRequest.interface';
import { NextFunction } from 'express';

@Injectable()
export class IsAdminOfCityMiddleware implements NestMiddleware {
  use(req: CustomRequestInterface, res: Response, next: NextFunction) {
    const { user, city } = req;
    if (!user || !city) {
      req.isAdminOfCity = false;
      next();
      return;
    }
    const isAdmin =
      user.adminForCities.findIndex(
        (administatingCity) => administatingCity.id === city.id,
      ) !== -1;
    req.isAdminOfCity = isAdmin;
    next();
  }
}
