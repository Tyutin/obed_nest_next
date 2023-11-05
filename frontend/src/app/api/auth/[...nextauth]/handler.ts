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
          id: profile.id.toString(),
          firstName: profile.first_name,
          lastName: profile.last_name,
          name: 'bad name',
          email: null,
          image: profile.photo_100,
        } as User
      },
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      return true
    },
    async session({ session, token, user }) {
      
      return session
    }
  }
}

export const handler = NextAuth(authOptions)