
import type {
  Adapter,
  AdapterUser,
  AdapterAccount,
  AdapterSession,
} from './types/adapterTypes'
import { DataSourceOptions, DataSource, EntityManager } from 'typeorm'
import {defaultEntities} from './entities'
import { parseDataSourceConfig, updateConnectionEntities } from './utils'

export const entities = defaultEntities
export type Entities = typeof entities

let _dataSource: DataSource | undefined

export async function getManager(options: {
  dataSource: string | DataSourceOptions
  entities: Entities
}): Promise<EntityManager> {
  if (!_dataSource) {
    const { dataSource, entities } = options
    const config = {
      ...parseDataSourceConfig(dataSource),
      entities: Object.values(entities),
    }
    _dataSource = new DataSource(config)
  }

  const manager = _dataSource?.manager

  if (!manager.connection.isInitialized) {
    await manager.connection.initialize()
  }

  if (process.env.NODE_ENV !== 'production') {
    await updateConnectionEntities(_dataSource, Object.values(options.entities))
  }
  return manager
}

export function TypeORMAdapter(
  dataSource: string | DataSourceOptions
): Adapter {
  const c: {
    dataSource: string | DataSourceOptions
    entities: Entities
  } = {
    dataSource,
    entities: {
      UserEntity: defaultEntities.UserEntity,
      SessionEntity: defaultEntities.SessionEntity,
      AccountEntity: defaultEntities.AccountEntity,
      VerificationTokenEntity: defaultEntities.VerificationTokenEntity,
      ProfileEntity: defaultEntities.ProfileEntity,
      CityEntity: defaultEntities.CityEntity,
      CategoryEntity: defaultEntities.CategoryEntity,
      ProductEntity: defaultEntities.ProductEntity
    },
  }

  return {
    async getUserByAccount(provider_providerAccountId) {
      //console.log('getUserByAccount start')
      //console.log(provider_providerAccountId)
      const m = await getManager(c)
      const account = await m.findOne<AdapterAccount & { user: AdapterUser }>(
        'AccountEntity',
        { where: provider_providerAccountId, relations: ['user'] }
      )
      if (!account) return null
      //console.log(account)
      //console.log('getUserByAccount end')
      return account.user ?? null
    },
    // @ts-expect-error
    createUser: async (data) => {
      //console.log('createUser start')
      //console.log(data)
      const m = await getManager(c)
      const user = await m.save('UserEntity', data)
      //console.log(user)
      //console.log('createUser end')
      return user
    },
    async linkAccount(data) {
      //console.log('linkAccount start')
      //console.log(data)
      const m = await getManager(c)
      const account = await m.save('AccountEntity', data)
      //console.log(account)
      //console.log('linkAccount end')
      return account
    },
    // @ts-expect-error
    async getUser(id) {
      //console.log('getUser start')
      //console.log(id)
      const m = await getManager(c)
      const user = await m.findOne('UserEntity', { where: { id } })
      if (!user) return null
      //console.log(user)
      //console.log('getUser end')
      return { ...user }
    },
    // @ts-expect-error
    async getUserByEmail(email) {
      //console.log('getUserByEmail start')
      //console.log(email)
      const m = await getManager(c)
      const user = await m.findOne('UserEntity', { where: { email } })
      if (!user) return null
      //console.log(user)
      //console.log('getUserByEmail end')
      return { ...user }
    },
    // @ts-expect-error
    async updateUser(data) {
      //console.log('updateUser start')
      //console.log(data)
      const m = await getManager(c)
      const user = await m.save('UserEntity', data)
      //console.log(user)
      //console.log('updateUser end')
      return user
    },
    async createSession(data) {
      //console.log('createSession start')
      //console.log(data)
      const m = await getManager(c)
      const session = await m.save('SessionEntity', data)
      //console.log(session)
      //console.log('createSession end')
      return session
    },
    async getSessionAndUser(sessionToken) {
      //console.log('getSessionAndUser start')
      //console.log(sessionToken)
      const m = await getManager(c)
      const sessionAndUser = await m.findOne<
        AdapterSession & { user: AdapterUser }
      >('SessionEntity', { where: { sessionToken }, relations: ['user'] })

      if (!sessionAndUser) return null
      const { user, ...session } = sessionAndUser
      //console.log(user)
      //console.log(session)
      //console.log('getSessionAndUser end')
      return { session, user }
    },
    async updateSession(data) {
      //console.log('updateSession start')
      //console.log(data)
      const m = await getManager(c)
      await m.update('SessionEntity', { sessionToken: data.sessionToken }, data)
      // TODO: Try to return?
      //console.log('updateSession end')
      return null
    },
    async deleteSession(sessionToken) {
      //console.log('deleteSession start')
      //console.log(sessionToken)
      const m = await getManager(c)
      await m.delete('SessionEntity', { sessionToken })
      //console.log('deleteSession end')
    },


    // // НУЖНЫ ДЛЯ АВТОРИЗАЦИИ ПО EMAIL
    // async createVerificationToken(data) {
    //   const m = await getManager(c)
    //   const verificationToken = await m.save('VerificationTokenEntity', data)
    //   // @ts-expect-error
    //   delete verificationToken.id
    //   return verificationToken
    // },
    // // @ts-expect-error
    // async useVerificationToken(identifier_token) {
    //   const m = await getManager(c)
    //   const verificationToken = await m.findOne('VerificationTokenEntity', {
    //     where: identifier_token,
    //   })
    //   if (!verificationToken) {
    //     return null
    //   }
    //   await m.delete('VerificationTokenEntity', identifier_token)
    //   // @ts-expect-error
    //   delete verificationToken.id
    //   return verificationToken
    // },

    // // СОВСЕМ ПОКА НЕНУЖНЫЕ
    // /**
    //  * Method used in testing. You won't need to call this in your app.
    //  * @internal
    //  */
    // async __disconnect() {
    //   const m = await getManager(c)
    //   await m.connection.close()
    // },
    // async deleteUser(id) {
    //   const m = await getManager(c)
    //   await m.transaction(async (tm) => {
    //     await tm.delete('AccountEntity', { userId: id })
    //     await tm.delete('SessionEntity', { userId: id })
    //     await tm.delete('UserEntity', { id })
    //   })
    // },
    // async unlinkAccount(providerAccountId) {
    //   const m = await getManager(c)
    //   await m.delete<AdapterAccount>('AccountEntity', providerAccountId)
    // },
  }
}
