import { cookies } from 'next/headers';
import { getCityName } from './helpers/city';
import { CityResponseInterface } from '../../../shared/types/City/front/CityResponse.interface';
import { sharedHeaders } from '../../../shared/constants/shared-headers';
import { ProductResponseInterface } from '../../../backend/src/product/types/productResponseInterface';
import { UpdateProductDtoInterface } from '../../../shared/types/Product/UpdateProductDto.interface';
import { CreateProductDtoInterface } from '../../../shared/types/Product/CreateProductDto.interface';
import { UpdateCategoryDtoInterface } from '@shared/types/Category/UpdateCategoryDto.interface';
import { CategoryResponseInterface } from '@shared/types/Category/front/CategoryResponse.interface';
import { CreateCategoryDtoInterface } from '@shared/types/Category/CreateCategoryDto.interface';
import { DeleteProductDtoInterface } from '@shared/types/Product/DeleteProductDto.interface';
import { DeleteCategoryDtoInterface } from '@shared/types/Category/DeleteCategoryDto.interface';

export const BACKEND_API_HOST = process.env.BACKEND_API_HOST || 'http://nestjs:3001' 

function fetchBuilder (props: {url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'}, data?: any): Promise<Response> {
  const {url,method} = props
  const cookieStore = cookies()

  const userSessionTokenValue = cookieStore.get('next-auth.session-token')?.value

  const headersToNest: Record<string,string> = {
    'Content-Type': 'application/json'
  }
  headersToNest[sharedHeaders.userSessionToken] = userSessionTokenValue || ''
  headersToNest[sharedHeaders.currentCity] = getCityName()

  return fetch(url, {cache: 'no-cache', method, headers: headersToNest, body: !!data ? JSON.stringify(data) : null})
}

export const fetchData = {
  city: {
    getCurrent: async (): Promise<CityResponseInterface | null> => {
      const cityName = getCityName()
      try {
        const response = await fetchBuilder({url: `${BACKEND_API_HOST}/city/${cityName}`, method: 'GET'})
        return await response.json()
      } catch (e) {
        console.log(e)
        return null
      }
    }
  },
  product: {
    updateProduct: async(updateProductDto: UpdateProductDtoInterface):Promise<ProductResponseInterface & Error> => {
      const data = {
        product: updateProductDto
      }
      const response = await fetchBuilder({url: `${BACKEND_API_HOST}/product`, method: 'PUT'}, data)
      return await response.json()
    },
    createProduct: async(createProductDto: CreateProductDtoInterface):Promise<ProductResponseInterface & Error> => {
      const data = {
        product: createProductDto
      }
      const response = await fetchBuilder({url: `${BACKEND_API_HOST}/product`, method: 'POST'}, data)
      return await response.json()
    },
    deleteProduct: async(deleteProductDto: DeleteProductDtoInterface):Promise<CategoryResponseInterface & Error> => {
      const data = {
        product: deleteProductDto
      }
      const response = await fetchBuilder({url: `${BACKEND_API_HOST}/product`, method: 'DELETE'}, data)
      return await response.json()
    }
  },
  category: {
    updateCategory: async(updateCategoryDto: UpdateCategoryDtoInterface): Promise<CategoryResponseInterface & Error> => {
      const data = {
        category: updateCategoryDto
      }
      const response = await fetchBuilder({url: `${BACKEND_API_HOST}/category`, method: 'PUT'}, data)
      return await response.json()
    },
    createCategory: async(createCategoryDto: CreateCategoryDtoInterface): Promise<CategoryResponseInterface & Error> => {
      const data = {
        category: createCategoryDto
      }
      const response = await fetchBuilder({url: `${BACKEND_API_HOST}/category`, method: 'POST'}, data)
      return await response.json()
    },
    deleteCategory: async(deleteCategoryDto: DeleteCategoryDtoInterface): Promise<CityResponseInterface & Error> => {
      const data = {
        category: deleteCategoryDto
      }
      const response = await fetchBuilder({url: `${BACKEND_API_HOST}/category`, method: 'DELETE'}, data)
      return await response.json()
    }
  }
}