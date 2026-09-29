import { auth0 } from '@/lib/auth0'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await auth0.getSession()

  const picture = session?.user.picture

  if (!picture) {
    return new NextResponse(null, {
      status: 404,
    })
  }

  return NextResponse.redirect(picture)
}
