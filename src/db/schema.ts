import { relations } from 'drizzle-orm';
import { pgTable, varchar, date, time, pgEnum, serial } from 'drizzle-orm/pg-core';

export const eventStatus = pgEnum('event_status', ['unavailable', 'unknown', 'booked']);
export const petType = pgEnum('pet_type', ['dog', 'cat']);

export const pets = pgTable('pets', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  type: petType('type').notNull().default('dog'),
});

export const events = pgTable('events', {
  date: date('date').primaryKey(),
  status: eventStatus('status').notNull(),
});

export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  startTime: time('start_time').notNull(),
  endTime: time('end_time').notNull(),
  petId: serial('pet_id')
    .references(() => pets.id, { onDelete: 'set null' })
    .notNull(),
  eventDate: date('event_date')
    .references(() => events.date, { onDelete: 'set null' })
    .notNull(),
});

export const eventsRelations = relations(events, ({ many }) => ({
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  pet: one(pets, {
    fields: [bookings.petId],
    references: [pets.id],
  }),
  event: one(events, {
    fields: [bookings.eventDate],
    references: [events.date],
  }),
}));
