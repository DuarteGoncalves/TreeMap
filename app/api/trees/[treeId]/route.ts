import { deleteTree, getTreeById, updateTree } from '@/db/repository'
import { getUserId } from '@/lib/user'
import { Tree } from '@/types'

export async function GET(
  _req: Request,
  { params }: { params: { treeId: string } }
) {
  const { treeId } = await params

  const tree: Tree = await getTreeById(treeId)

  return Response.json(tree)
}

export async function PUT(
  req: Request,
  { params }: { params: { treeId: string } }
) {
  const [{ treeId }, appUserId, body] = await Promise.all([
    params,
    getUserId(),
    req.json(),
  ])

  const tree: Tree = await getTreeById(treeId)

  const updatedTree: Tree = await updateTree(appUserId, {
    ...tree,
    ...body,
  })

  return Response.json(updatedTree)
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ treeId: string }> }
) {
  const [{ treeId }, appUserId] = await Promise.all([
    params,
    getUserId(),
  ])

  await deleteTree(appUserId, treeId)

  return new Response(null, { status: 204 })
}
