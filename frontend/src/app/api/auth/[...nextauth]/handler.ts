import { TypeORMAdapter } from '@auth/typeorm-adapter';
import { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import  VkProvider  from 'next-auth/providers/vk';
import config from '../../../../../../backend/dataSource/dataSource.config'

// const apiVersion = '5.131' // https://vk.com/dev/versions

export const authOptions: AuthOptions = {
  adapter: TypeORMAdapter({...config}),
  providers: [
    VkProvider({
      clientId: process.env.VK_CLIENT_ID || '',
      clientSecret: process.env.VK_CLIENT_SECRET || '',
      // authorization: `https://oauth.vk.com/authorize?scope=email&v=${apiVersion}`,
      // token: `https://oauth.vk.com/access_token?v=${apiVersion}`,
      // userinfo: `https://api.vk.com/method/users.get?fields=photo_100,city,country,sex&v=${apiVersion}`,
      httpOptions: {
        timeout: 10000
      }
    })
  ],
}

export const handler = NextAuth(authOptions)