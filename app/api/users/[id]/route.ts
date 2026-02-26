import { users } from '@/app/mock/users'
import { User } from '@/types'
import { NextResponse } from 'next/server'

type Params = { params: { id: string } }

export async function PUT(
  request: Request,
  { params }: Params
) {
  const body = await request.json()
  const user = users.find((u: any) => u.id === params.id)

  if (!user) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  user.name = body.name ?? user.name
  user.email = body.email ?? user.email

  return NextResponse.json(user)
}

export async function DELETE(
  _request: Request,
  { params }: Params
) {
  const { id } = await params

  const index = users.findIndex((u: User) => u.id === id)

  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  users.splice(index, 1)

  return NextResponse.json(null, { status: 200 })
}
