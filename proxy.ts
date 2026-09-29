import { NextRequest, NextResponse } from 'next/server'
import { auth0 } from './lib/auth0'

const PUBLIC_PATHS = ['/auth']

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const isPublicPath = PUBLIC_PATHS.some((path) =>
    pathname.startsWith(path)
  )

  const session = await auth0.getSession(request)

  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return await auth0.middleware(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
