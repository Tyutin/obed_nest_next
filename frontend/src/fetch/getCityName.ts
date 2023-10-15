import { cookies, headers } from 'next/headers';

export function getCityName(): string {
  let cityName: string;
  const headersList = headers();
  const domain = headersList.get('host') || '';
  if(domain.includes('localhost')) {
    const cookieStorage = cookies()
    cityName = cookieStorage.get('cityName')?.value || 'demo'
  } else {
    cityName = domain.split('.')[0]
  }
  return cityName
}