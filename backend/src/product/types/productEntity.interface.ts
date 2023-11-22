import { CategoryEntity } from '../../category/category.entity';
import { ProductRawInterface } from '../../../../shared/types/Product/ProductRaw.interface';
import { CityEntity } from '../../city/city.entity';

export interface ProductEntityInterface extends ProductRawInterface {
  category: CategoryEntity;
  city: CityEntity;
}
