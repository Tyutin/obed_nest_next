import { createProfile } from '@fetch/profile';
import { getProfile } from '@fetch/profile';
import { AuthOptions, User } from 'next-auth'
import NextAuth from 'next-auth/next'
import  VkProvider, {VkProfile}  from 'next-auth/providers/vk';

const apiVersion = '5.131' // https://vk.com/dev/versions

export const authOptions: AuthOptions = {
  providers: [
    VkProvider({
      clientId: process.env.VK_CLIENT_ID || '',
      clientSecret: process.env.VK_CLIENT_SECRET || '',
      authorization: `https://oauth.vk.com/authorize?scope=email&v=${apiVersion}`,
      token: `https://oauth.vk.com/access_token?v=${apiVersion}`,
      userinfo: `https://api.vk.com/method/users.get?fields=photo_100,city,country,sex&v=${apiVersion}`,
      profile: (result: VkProfile) => {
        const profile = result.response?.[0] ?? {}
        return {
          id: profile.id,
          firstName: profile.first_name,
          lastName: profile.last_name,
          name: 'bad name',
          email: null,
          image: profile.photo_100,
        } as User
      },
      httpOptions: {
        timeout: 10000
      }
    })
  ],
  callbacks: {
    async signIn({ user }) {
      const profileResponse = await getProfile(Number(user.id))
      const { profile } = profileResponse
      if(!profile) {
        await createProfile(Number(user.id), user.firstName || '', user.lastName || '')
      }
      return true
    },
    async session({ session }) {
      
      return session
    }
  }
}

export const handler = NextAuth(authOptions)