import { Injectable, NestMiddleware } from '@nestjs/common';
import { CustomRequestInterface } from '../../types/customRequest.interface';
import { NextFunction } from 'express';
import { sharedHeaders } from '../../../../shared/constants/shared-headers';
import { CityService } from '../city.service';

@Injectable()
export class CityMiddleware implements NestMiddleware {
  constructor(private readonly cityService: CityService) {}
  async use(req: CustomRequestInterface, res: Response, next: NextFunction) {
    const cityName = req.headers[sharedHeaders.currentCity];
    if (!cityName || !(typeof cityName === 'string')) {
      req.city = null;
      next();
      return;
    }
    const city = await this.cityService.getCityBySlug(cityName);
    if (!city) {
      req.city = null;
      next();
      return;
    }
    req.city = city;
    next();
  }
}
