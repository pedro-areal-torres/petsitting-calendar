import { relations } from 'drizzle-orm';
import { pgTable, date, time, serial } from 'drizzle-orm/pg-core';
import { pets } from './pets';
import { events } from './events';

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
