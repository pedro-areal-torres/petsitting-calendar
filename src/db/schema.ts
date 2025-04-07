import { pgTable, varchar, date, uuid, text, time, pgEnum } from 'drizzle-orm/pg-core';

export const availabilityStatus = pgEnum('availability_status', ['unavailable', 'unknown']);

export const availability = pgTable('availability', {
  date: date('date').primaryKey(),
  status: availabilityStatus('status').notNull(),
});

export const pets = pgTable('pets', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  imageUrl: text('image_url'),
});

export const petsittingEvents = pgTable('petsitting_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  date: date('date').notNull(),
  petId: uuid('pet_id').references(() => pets.id, { onDelete: 'set null' }),
  startTime: time('start_time').notNull(),
  endTime: time('end_time').notNull(),
  notes: text('notes'),
});
