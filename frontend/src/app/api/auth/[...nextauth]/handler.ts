import { AuthOptions, User } from 'next-auth'
import NextAuth from 'next-auth/next'
import  VkProvider, {VkProfile}  from 'next-auth/providers/vk';
import config from '../../../../../../backend/dataSource/dataSource.config'
import { TypeORMAdapter } from './adapter';
import * as entities from '../../../../../../backend/src/next-auth/nextAuth.entity'

const apiVersion = '5.131' // https://vk.com/dev/versions

export const authOptions: AuthOptions = {
  adapter: TypeORMAdapter(config, {entities}),
  providers: [
    VkProvider({
      clientId: process.env.VK_CLIENT_ID || '',
      clientSecret: process.env.VK_CLIENT_SECRET || '',
      authorization: `https://oauth.vk.com/authorize?scope=email,phone_number&v=${apiVersion}`,
      token: `https://oauth.vk.com/access_token?v=${apiVersion}&scope=offline,contacts,email`,
      userinfo: `https://api.vk.com/method/users.get?fields=activities,about,blacklisted,blacklisted_by_me,books,bdate,can_be_invited_group,can_post,can_see_all_posts,can_see_audio,can_send_friend_request,can_write_private_message,career,common_count,connections,contacts,city,country,crop_photo,domain,education,exports,followers_count,friend_status,has_photo,has_mobile,home_town,photo_100,photo_200,photo_200_orig,photo_400_orig,photo_50,sex,site,schools,screen_name,status,verified,games,interests,is_favorite,is_friend,is_hidden_from_feed,last_seen,maiden_name,military,movies,music,nickname,occupation,online,personal,photo_id,photo_max,photo_max_orig,quotes,relation,relatives,timezone,tv,universities&v=${apiVersion}`,
      httpOptions: {
        timeout: 10000
      },
      profile(result: VkProfile) {
        const profile = result.response?.[0] ?? {}
        console.log('PROFILE')
        console.log(profile)
        return {
          id: profile.id.toString(),
          name: [profile.first_name, profile.last_name].filter(Boolean).join(' '),
          email: null,
          image: profile.photo_100,
          firstName: profile.first_name,
          lastName: profile.last_name
        } as User
      },
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account &&  account.email) {
        user.email = account?.email.toString() || ''
      }
      console.log('signInStart')
      console.log(user)
      console.log(account)
      console.log(profile)
      console.log(email)
      console.log(credentials)
      console.log('signInEnd')
      return true
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    async session({ session, user, token }) {
      console.log('sessionStart')
      console.log(session)
      console.log(user)
      console.log(token)
      console.log('sessionEnd')
      return session
    },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token
    // }
  }
}

export const handler = NextAuth(authOptions)