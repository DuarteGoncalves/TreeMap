import { users } from '@/app/mock/users'
import { User } from '@/types'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  const body = await request.json()

  const user: User = {
    id: crypto.randomUUID(),
    name: body.name,
    email: body.email,
  }

  users.push(user)

  return NextResponse.json(user, { status: 201 })
}