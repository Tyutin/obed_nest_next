import { ENDPOINTS } from '@fetch/constants';
import { CityResponseInterface } from '../../../../shared/types/City/front/CityResponse.interface';
import { getCityName } from './helpers';

export async function getCity():Promise<CityResponseInterface> {
  const cityName = getCityName()
  const res = await fetch(ENDPOINTS.city.get(cityName), {cache: 'no-store'});
  if(!res.ok) {
    return {} as CityResponseInterface
  }
  return await res.json()
}