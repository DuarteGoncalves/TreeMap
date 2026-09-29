import { v4 as uuid } from 'uuid'
import { Tree } from '@/types'
import { createTree, getTreesByUserId } from '@/db/repository'
import { getUserId as getAppUserId } from '@/lib/user'

export async function GET() {
  const appUserId = await getAppUserId()

  const trees = await getTreesByUserId(appUserId)

  return Response.json(trees)
}

export async function POST(req: Request) {
  const [appUserId, body] = await Promise.all([
    getAppUserId(),
    req.json(),
  ])

  const newTree: Tree = await createTree({
    id: uuid(),
    userId: appUserId,
    lat: body.lat,
    lng: body.lng,
    species: body.species,
    accuracy: body.accuracy ?? null,
    notes: body.notes ?? null,
    createdAt: new Date(),
  })

  return Response.json(newTree, { status: 201 })
}
