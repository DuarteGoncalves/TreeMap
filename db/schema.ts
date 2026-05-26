import {
  pgTable,
  text,
  timestamp,
  doublePrecision,
  pgEnum,
  uuid,
  index,
} from 'drizzle-orm/pg-core'

export const treeSpeciesEnum = pgEnum('tree_species', ['olive', 'pine'])

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),

  name: text('name').notNull(),

  email: text('email').notNull().unique(),
})

export const trees = pgTable(
  'trees',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    userId: uuid('user_id')
      .references(() => users.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    species: treeSpeciesEnum('species').notNull(),

    lat: doublePrecision('lat').notNull(),

    lng: doublePrecision('lng').notNull(),

    accuracy: doublePrecision('accuracy'),

    createdAt: timestamp('created_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    notes: text('notes'),
  },
  (table) => ({
    userIdIdx: index('trees_user_id_idx').on(table.userId),

    speciesIdx: index('trees_species_idx').on(table.species),

    createdAtIdx: index('trees_created_at_idx').on(table.createdAt),
  })
)

export const treePhotos = pgTable(
  'tree_photos',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    treeId: uuid('tree_id')
      .references(() => trees.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    filename: text('filename').notNull(),

    path: text('path').notNull(),

    createdAt: timestamp('created_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    lat: doublePrecision('lat'),

    lng: doublePrecision('lng'),
  },
  (table) => ({
    treeIdIdx: index('tree_photos_tree_id_idx').on(table.treeId),

    createdAtIdx: index('tree_photos_created_at_idx').on(
      table.createdAt
    ),
  })
)
