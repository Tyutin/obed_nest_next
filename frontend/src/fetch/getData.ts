import { BACKEND_API_HOST } from '../constants/api';
import { CityResponseInterface } from '../../../backend/src/city/types/cityResponse.interface';

export async function getCity(cityName: string):Promise<CityResponseInterface> {
  const res = await fetch(`${BACKEND_API_HOST}/city/${cityName}`, {cache: 'no-store'});
  if(!res.ok) {
    return {} as CityResponseInterface
  }
  return await res.json()
}