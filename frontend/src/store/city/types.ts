import { ProductEntityInterface } from '@shared/types/Product/front/ProductEntity.interface'
import { CityEntityInterface } from '../../../../shared/types/City/front/CityEntity.interface'
import { CategoryEntityInterface } from '@shared/types/Category/front/CategoryEntity.interface'

export type CityStore = {
  city: CityEntityInterface
  storeAddProduct: (categoryId: number, product: ProductEntityInterface) => void
  storeUpdateProduct: (categoryId: number, product: ProductEntityInterface) => void
  storeAddCategory: (category: CategoryEntityInterface) => void
  storeUpdateCategory: (category: CategoryEntityInterface) => void
  storeDeleteProduct: (productIds: number[]) => void
}