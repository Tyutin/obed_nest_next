import { DefaultSession } from 'next-auth'
 
declare module 'next-auth' {
  interface User {
    id: number
    firstName?: string | null
    lastName?: string | null
    image?: string | null
  }
  // interface Session extends DefaultSession {
  //   user: {
  //     id: number;
  //     firstName?: string | null
  //     lastName?: string | null
  //     image?: string | null
  //   }
  // }
}