import create from 'zustand'
import { ProductStore } from './types'
import { devtools } from 'zustand/middleware'

export const useProductStore = create<ProductStore>()(
  devtools<ProductStore>(
    () => ({
      products: []
    })
  )
)