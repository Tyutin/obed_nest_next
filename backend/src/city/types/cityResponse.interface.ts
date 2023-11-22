import { CityEntity } from '../city.entity';

export interface CityResponseInterface {
  city: Omit<CityEntity, 'setCity'>;
  isAdminOrSecret: boolean;
}
