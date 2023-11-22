import { cookies, headers } from 'next/headers';

export function getCityName(): string {
  let cityName: string;
  const headersList = headers();
  const host = headersList.get('host') || '';
  if(host.includes('localhost')) {
    const cookieStorage = cookies()
    cityName = cookieStorage.get('cityName')?.value || 'demo'
  } else {
    cityName = host.replace(`.${process.env.CURRENT_DOMAIN}` || '', '')
  }
  return cityName
}