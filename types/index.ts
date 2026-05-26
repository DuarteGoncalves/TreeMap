import { treePhotos, trees, users } from '@/db/schema'

export type User = typeof users.$inferSelect
export type Tree = typeof trees.$inferSelect
export type TreePhoto = typeof treePhotos.$inferSelect
