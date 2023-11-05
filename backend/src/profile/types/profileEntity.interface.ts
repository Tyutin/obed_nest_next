import { CityEntity } from 'src/city/city.entity';
import { ProfileRawInterface } from '../../../../shared/types/Profile/ProfileRaw.interface';

export interface ProfileEntityInterface extends ProfileRawInterface {
  city: CityEntity;
}
