import { deleteTree } from '@/db/repository'
import { getTrees, saveTrees } from '@/lib/storage'
import { getUserId } from '@/lib/user'
import { Tree } from '@/types'

export async function GET(
  _req: Request,
  { params }: { params: { userId: string; treeId: string } }
) {
  const { userId, treeId } = await params

  const trees = await getTrees(userId)

  const tree = trees.find((t) => t.id === treeId)

  if (!tree) {
    return new Response('Tree not found', { status: 404 })
  }

  return Response.json(tree)
}

export async function PUT(
  req: Request,
  { params }: { params: { userId: string; treeId: string } }
) {
  const { userId, treeId } = await params
  const body = await req.json()

  const trees = await getTrees(userId)

  const index = trees.findIndex((t) => t.id === treeId)

  if (index === -1) {
    return new Response('Tree not found', { status: 404 })
  }

  const updatedTree: Tree = {
    ...trees[index],
    ...body,
  }

  trees[index] = updatedTree

  await saveTrees(userId, trees)

  return Response.json(updatedTree)
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ treeId: string }> }
) {
  const { treeId } = await params

  const appUserId = await getUserId()

  await deleteTree(appUserId, treeId)

  return new Response(null, { status: 204 })
}
