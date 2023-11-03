import { CategoryEntity } from 'src/category/category.entity';
import { CityRawInterface } from '../../../../shared/types/City/CityRaw.interface';
import { ProductEntity } from 'src/product/product.entity';

export interface CityEntityInterface extends CityRawInterface {
  categories: CategoryEntity[];
  products: ProductEntity[];
  setCity: () => void;
}
