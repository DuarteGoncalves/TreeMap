import type { User } from '@auth0/nextjs-auth0'

declare module '@auth0/nextjs-auth0/types' {
  interface User {
    appUserId: string
  }
}

export {}
