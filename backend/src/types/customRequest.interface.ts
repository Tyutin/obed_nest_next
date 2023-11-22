import { Request } from 'express';
import { UserEntity } from '../next-auth/nextAuth.entity';
import { CityEntity } from '../city/city.entity';
import { ProfileEntity } from '../profile/profile.entity';

export interface CustomRequestInterface extends Request {
  user?: UserEntity;
  city?: CityEntity;
  profile?: ProfileEntity;
  authBySecret?: boolean;
}
