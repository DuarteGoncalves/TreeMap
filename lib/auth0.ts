import { Auth0Client } from '@auth0/nextjs-auth0/server'
import { getUserFromName } from '@/db/repository'

export const auth0 = new Auth0Client({
  async beforeSessionSaved(session) {
    const user = await getUserFromName(session?.user.sub ?? 'default')
    session.user.appUserId = user[0].id
    return session
  },
})
