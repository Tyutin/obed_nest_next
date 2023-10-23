import { CategoryEntity } from 'src/category/category.entity';
import { CityRawInterface } from '../../../../shared/types/City/CityRaw.interface';

export interface CityEntityInterface extends CityRawInterface {
  categories: CategoryEntity[];
  setCity: () => void;
}
