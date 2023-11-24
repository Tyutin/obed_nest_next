import { cookies } from 'next/headers';
import { getCityName } from './helpers/city';
import { CityResponseInterface } from '../../../shared/types/City/front/CityResponse.interface';
import { sharedHeaders } from '../../../shared/constants/shared-headers';
import { ProductResponseInterface } from '../../../backend/src/product/types/productResponseInterface';
import { UpdateProductDtoInterface } from '../../../shared/types/Product/UpdateProductDto.interface';
import { CreateProductDtoInterface } from '../../../shared/types/Product/CreateProductDto.interface';

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
    updateProduct: async(updateProductDto: UpdateProductDtoInterface):Promise<ProductResponseInterface | null> => {
      const data = {
        product: updateProductDto
      }
      try {
        const response = await fetchBuilder({url: `${BACKEND_API_HOST}/product`, method: 'PUT'}, data)
        return await response.json()
      } catch (e) {
        console.log(e)
        return null
      }
    },
    createProduct: async(createProductDto: CreateProductDtoInterface):Promise<ProductResponseInterface | null> => {
      const data = {
        product: createProductDto
      }
      try {
        const response = await fetchBuilder({url: `${BACKEND_API_HOST}/product`, method: 'POST'}, data)
        return await response.json()
      } catch (e) {
        console.log(e)
        return null
      }
    }
  }
}