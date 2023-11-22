import { cookies } from 'next/headers';
import { getCityName } from './helpers/city';
import { CityResponseInterface } from '../../../shared/types/City/front/CityResponse.interface';
import { sharedHeaders } from '../../../shared/constants/shared-headers';

export const BACKEND_API_HOST = process.env.BACKEND_API_HOST || 'http://nestjs:3001' 

function fetchBuilder (props: {url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'}, data?: any): Promise<Response> {
  const {url,method} = props
  const cookieStore = cookies()

  const userSessionTokenValue = cookieStore.get('next-auth.session-token')?.value

  const headersToNest: Record<string,string> = {
    // 'x-user-session-token': userSessionToken || '',
    // 'x-current-city': getCityName(),
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
      const response = await fetchBuilder({url: `${BACKEND_API_HOST}/city/${cityName}`, method: 'GET'})
      if(!response.ok) {
        return null
      }
      return await response.json()
    }
  }
}