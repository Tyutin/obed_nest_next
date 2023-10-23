import { CategoryEntity } from 'src/category/category.entity';
import { ProductRawInterface } from '../../../../shared/types/Product/ProductRaw.interface';

export interface ProductEntityInterface extends ProductRawInterface {
  category: CategoryEntity;
}
