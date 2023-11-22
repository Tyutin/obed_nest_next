import { ProductEntity } from '../../product/product.entity';
import { CategoryRawInterface } from '../../../../shared/types/Category/CategoryRaw.interface';
import { CityEntity } from '../../city/city.entity';

export interface CategoryEntityInterface extends CategoryRawInterface {
  products: ProductEntity[];
  city: CityEntity;
}
