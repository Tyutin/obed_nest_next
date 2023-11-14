export const BACKEND_API_HOST = process.env.BACKEND_API_HOST || 'http://nestjs:3001' 
export const FRONTEND_API_HOST = 'http://localhost:3000' 

export const ENDPOINTS = {
  city: {
    get: (cityName:string) => `${BACKEND_API_HOST}/city/${cityName}`
  },
  profile: {
    get: `${BACKEND_API_HOST}/profile/get`,
    create: `${BACKEND_API_HOST}/profile`
  }
}