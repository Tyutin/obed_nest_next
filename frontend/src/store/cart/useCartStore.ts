import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'
import { CartState, CartStore } from './types'
import Cookies from 'js-cookie'

export const useCartStore = create<CartStore>()(
  immer(
    devtools(
      set => ({
        items: [],
        addItem: (id) => set(
          (state) => {
            const alreadyItemInCart = state.items.find(item => item.id === id)
            if (alreadyItemInCart) {
              alreadyItemInCart.count = alreadyItemInCart.count + 1
            } else {
              state.items.push({count: 1, id})
            }
            saveCartToCookie(state)
          }
        ),
        decrementItem: (id) => set(
          (state) => {
            const alreadyItemInCart = state.items.find(item => item.id === id)
            if (!alreadyItemInCart || !alreadyItemInCart.count) {
              return
            } else if (alreadyItemInCart && alreadyItemInCart.count && alreadyItemInCart.count > 1) {
              alreadyItemInCart.count = alreadyItemInCart.count - 1
            } else if (alreadyItemInCart && alreadyItemInCart.count) {
              const itemIndex = state.items.indexOf(alreadyItemInCart)
              state.items.splice(itemIndex, 1)
            }
            saveCartToCookie(state)
          }
        ),
        removeItem: (id) => set(
          (state) => {
            const alreadyItemInCart = state.items.find(item => item.id === id)
            if (!alreadyItemInCart || !alreadyItemInCart.count) {
              return
            } else if (alreadyItemInCart && alreadyItemInCart.count) {
              const itemIndex = state.items.indexOf(alreadyItemInCart)
              state.items.splice(itemIndex, 1)
            }
            saveCartToCookie(state)
          }
        ),
      })
    )
  )
)

function saveCartToCookie(state: CartState) {
  Cookies.set('obed_cart', JSON.stringify(state), {expires: 1})
}