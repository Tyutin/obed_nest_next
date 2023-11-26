export interface ProductInCart {
  id: number;
  count: number;
}

export type CartState = {
  items: ProductInCart[]
}

export type CartActions = {
  addItem: (id: number) => void
  decrementItem: (id: number) => void
  removeItem: (id: number) => void
}

export type CartStore = CartState & CartActions