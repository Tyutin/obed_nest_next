import create from 'zustand'
import { ProductEntityInterface } from '../../../shared/types/Product/front/ProductEntity.interface'
import { immer } from 'zustand/middleware/immer'
import { devtools, persist } from 'zustand/middleware'

export interface ProductInCart extends ProductEntityInterface {
  count: number
}

type CartState = {
  items: ProductInCart[]
  totalPrice: number
}

type CartActions = {
  addItem: (item: ProductEntityInterface) => void
  decrementItem: (item: ProductEntityInterface) => void
  removeItem: (item: ProductEntityInterface) => void
}

type CartStore = CartState & CartActions

const getNewTotalPrice = (items: CartState['items']): number => {
  let newTotalPrice = 0
  items.forEach(item => {
    newTotalPrice += item.count * item.price
  })
  return newTotalPrice
} 

export const useCartStore = create<CartStore>()(
  persist(
    immer(
      devtools(
        set => ({
          items: [],
          totalPrice: 0,
          addItem: (item: ProductEntityInterface) => set(
            (state) => {
              const alreadyItemInCart = state.items.find(product => product.id === item.id)
              if (alreadyItemInCart) {
                alreadyItemInCart.count = alreadyItemInCart.count + 1
              } else {
                state.items.push({count: 1, ...item})
              }
              state.totalPrice = getNewTotalPrice(state.items)
            }
          ),
          decrementItem: (item: ProductEntityInterface) => set(
            (state) => {
              const alreadyItemInCart = state.items.find(product => product.id === item.id)
              if (!alreadyItemInCart || !alreadyItemInCart.count) {
                return
              } else if (alreadyItemInCart && alreadyItemInCart.count && alreadyItemInCart.count > 1) {
                alreadyItemInCart.count = alreadyItemInCart.count - 1
              } else if (alreadyItemInCart && alreadyItemInCart.count) {
                const itemIndex = state.items.indexOf(alreadyItemInCart)
                state.items.splice(itemIndex, 1)
              }
              state.totalPrice = getNewTotalPrice(state.items)
            }
          ),
          removeItem: (item: ProductEntityInterface) => set(
            (state) => {
              const alreadyItemInCart = state.items.find(product => product.id === item.id)
              if (!alreadyItemInCart || !alreadyItemInCart.count) {
                return
              } else if (alreadyItemInCart && alreadyItemInCart.count) {
                const itemIndex = state.items.indexOf(alreadyItemInCart)
                state.items.splice(itemIndex, 1)
              }
              state.totalPrice = getNewTotalPrice(state.items)
            }
          )
        })
      )
    )
    , {name: 'cartStore', version: 1}
  )
  
)