import { CategoryEntityInterface } from "../../Category/front/CategoryEntity.interface";
import { CityRawInterface } from "../CityRaw.interface";

export interface CityEntityInterface extends CityRawInterface {
  categories: CategoryEntityInterface[]
}