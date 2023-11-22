// import { getCity } from '@fetch/city/getCity'
// import { ProfileResponseInterface } from '../../../../shared/types/Profile/front/ProfileResponse.interface'
// import { ENDPOINTS } from '@fetch/constants'

// export async function createProfile(vkId: number, firstName: string, lastName: string):Promise<ProfileResponseInterface | null> {
//   const {city} = await getCity()
//   const data = {
//     profile: {
//       vkId,
//       cityId: city.id,
//       firstName,
//       lastName
//     }
//   }

//   try {
//     const res = await fetch(ENDPOINTS.profile.create, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     })
//     return await res.json()
//   } catch (e) {
//     console.log(e)
//     return null
//   }
// }