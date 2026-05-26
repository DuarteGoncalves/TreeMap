import { treePhotos, trees, users } from './schema'

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type Tree = typeof trees.$inferSelect
export type NewTree = typeof trees.$inferInsert

export type TreePhoto = typeof treePhotos.$inferSelect
export type NewTreePhoto = typeof treePhotos.$inferInsert
