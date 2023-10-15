import { BACKEND_API_HOST } from '../constants/api';
import { CityResponseInterface } from '../../../backend/src/city/types/cityResponse.interface';
import { getCityName } from './getCityName';

const ENDPOINTS = {
  city: {
    get: (cityName:string) => `${BACKEND_API_HOST}/city/${cityName}`
  }
}

export async function getCity():Promise<CityResponseInterface> {
  const cityName = getCityName()
  const res = await fetch(ENDPOINTS.city.get(cityName), {cache: 'no-store'});
  if(!res.ok) {
    return {} as CityResponseInterface
  }
  return await res.json()
}