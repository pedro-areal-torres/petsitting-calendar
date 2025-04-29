'use server';

import { db } from '@/db/drizzle';
import { events } from '@/db/schema';
import { startOfMonth } from 'date-fns';
import { gte } from 'drizzle-orm';

export type Events = Awaited<ReturnType<typeof getAllEvents>>;

export const getAllEvents = async () => {
  const today = new Date();
  const fromDate = startOfMonth(today).toISOString().split('T')[0]; // "YYYY-MM-DD"

  const result = await db.query.events.findMany({
    where: gte(events.date, fromDate),
    with: {
      bookings: {
        with: {
          pet: true,
        },
      },
    },
  });

  return result;
};
