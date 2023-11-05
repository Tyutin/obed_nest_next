import { CategoryEntity } from 'src/category/category.entity';
import { ProductRawInterface } from '../../../../shared/types/Product/ProductRaw.interface';
import { CityEntity } from 'src/city/city.entity';

export interface ProductEntityInterface extends ProductRawInterface {
  category: CategoryEntity;
  city: CityEntity;
}
