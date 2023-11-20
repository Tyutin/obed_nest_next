import { CityEntity } from 'src/city/city.entity';
import { ProfileRawInterface } from '../../../../shared/types/Profile/ProfileRaw.interface';
// import { UserEntity } from 'src/next-auth/nextAuth.entity';

export interface ProfileEntityInterface extends ProfileRawInterface {
  city: CityEntity;
  // userId: UserEntity;
}
