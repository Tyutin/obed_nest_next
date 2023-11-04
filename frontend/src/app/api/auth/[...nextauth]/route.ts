import NextAuth from 'next-auth/next';
import VkProvider from 'next-auth/providers/vk';

export const authOptions = {
  providers: [
    VkProvider({
      clientId: process.env.VK_CLIENT_ID || '',
      clientSecret: process.env.VK_CLIENT_SECRET || ''
    })
  ]
}

export const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}