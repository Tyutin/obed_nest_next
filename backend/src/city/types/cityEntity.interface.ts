import { CategoryEntity } from '../../category/category.entity';
import { CityRawInterface } from '../../../../shared/types/City/CityRaw.interface';
import { ProductEntity } from '../../product/product.entity';
import { ProfileEntity } from '../../profile/profile.entity';

export interface CityEntityInterface extends CityRawInterface {
  categories: CategoryEntity[];
  products: ProductEntity[];
  profiles: ProfileEntity[];
  setCity: () => void;
}
