import create from 'zustand'
import { CityStore } from './types'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { WorkHoursInterface } from '@shared/types/City/extra/workHours/WorkHours.interface'

export const useCityStore = create<CityStore>()(
  immer(
    devtools(
      set => ({
        city: {
          id: 0,
          createdAt: new Date(),
          nextPayment: new Date(),
          isWorking: true,
          city: 'city',
          slugRu: 'city',
          slugEn: 'сити',
          companyName: 'companyName',
          phones: ['+7 999 999 99 99'],
          email: 'email',
          vkLink: 'vkLink',
          telegramLink: 'telegramLink',
          instagramLink: 'instagramLink',
          legalInfo: 'legalInfo',
          minimumOrderFrom: 0,
          newDayStartTime: 12,
          workHours: {} as WorkHoursInterface,
          deliveryZones: [],
          shippingZoneMapLink: 'shippingZoneMapLink',
          categories: [],
          products: []
        },
        storeAddProduct: (categoryId, product) => set((state) => {
          const category = state.city.categories.find(cat => cat.id === categoryId)
          if(!category) return
          category.products.push(product)
        }),
        storeUpdateProduct: (categoryId, product) => set((state) => {
          const category = state.city.categories.find(cat => cat.id === categoryId)
          if(!category) return
          const productInStore = category.products.find(p => p.id === product.id)
          if(!productInStore) return
          Object.assign(productInStore, product)
        }),
        storeAddCategory: (category) => set((state) => {
          state.city.categories.push(category)
        }),
        storeUpdateCategory: (category) => set((state) => {
          const categoryInStore = state.city.categories.find(cat => cat.id === category.id)
          if (!categoryInStore) return
          Object.assign(categoryInStore, category)
        }),
      })
    )
  )
)