import { SessionData } from '@auth0/nextjs-auth0/types'
import { auth0 } from './auth0'

export const getUserId = async () => {
  const session: SessionData | null = await auth0.getSession()

  return session?.user.appUserId ?? 'default'
}
