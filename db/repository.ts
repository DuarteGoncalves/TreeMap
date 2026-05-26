import { Tree, User } from '@/types'
import { db } from '.'
import { trees, users } from './schema'
import { and, eq } from 'drizzle-orm'

export const createUser = async (data: User) => {
  await db.insert(users).values(data).returning()
}

export const getUserFromName = async (name: string) => {
  return db.select().from(users).where(eq(users.name, name))
}

export const createTree = async (data: Tree) => {
  const result = await db.insert(trees).values(data).returning()
  return result[0]
}

export const deleteTree = async (userId: string, treeId: string) => {
  await db
    .delete(trees)
    .where(and(eq(trees.id, treeId), eq(trees.userId, userId)))
}

export const getTreesByUserId = async (userId: string) => {
  return db.select().from(trees).where(eq(trees.userId, userId))
}
