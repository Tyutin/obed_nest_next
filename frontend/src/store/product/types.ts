import { ProductEntityInterface } from '../../../../shared/types/Product/front/ProductEntity.interface'

export type ProductStore = {
  products: ProductEntityInterface[]
}

export interface ProductEntityInCart extends ProductEntityInterface {
  count: number
}