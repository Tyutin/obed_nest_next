// import { GetProfileDtoFront } from '../../../../shared/types/Profile/front/dto/GetProfile.dto'
// import { ENDPOINTS } from '@fetch/constants'
// import { ProfileResponseInterface } from '../../../../shared/types/Profile/front/ProfileResponse.interface'
// import { getCity } from '@fetch/city/getCity'

// export async function getProfile(vkId: number):Promise<ProfileResponseInterface> {
//   const {city} = await getCity()
//   const data:GetProfileDtoFront = {
//     profile: {
//       vkId,
//       cityId: city.id
//     }
//   }
//   const res = await fetch(ENDPOINTS.profile.get, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })
//   return await res.json()

// }