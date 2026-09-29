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

export const parcels = pgTable(
  'parcels',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    userId: uuid('user_id')
      .references(() => users.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    name: text('name').notNull(),

    description: text('description'),

    createdAt: timestamp('created_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('parcels_user_id_idx').on(table.userId),
    index('parcels_created_at_idx').on(table.createdAt),
  ]
)

export const trees = pgTable(
  'trees',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    userId: uuid('user_id')
      .references(() => users.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    parcelId: uuid('parcel_id').references(() => parcels.id, {
      onDelete: 'set null',
    }),

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
  (table) => [
    index('trees_user_id_idx').on(table.userId),
    index('trees_parcel_id_idx').on(table.parcelId),
    index('trees_species_idx').on(table.species),
    index('trees_created_at_idx').on(table.createdAt),
  ]
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
  (table) => [
    index('tree_photos_tree_id_idx').on(table.treeId),
    index('tree_photos_created_at_idx').on(table.createdAt),
  ]
)
