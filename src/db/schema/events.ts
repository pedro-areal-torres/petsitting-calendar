import { relations } from 'drizzle-orm';
import { pgTable, date, pgEnum } from 'drizzle-orm/pg-core';
import { bookings } from './bookings';

export const eventStatus = pgEnum('event_status', ['unavailable', 'unknown', 'booked']);

export const events = pgTable('events', {
  date: date('date').primaryKey(),
  status: eventStatus('status').notNull(),
});

export const eventsRelations = relations(events, ({ many }) => ({
  bookings: many(bookings),
}));
