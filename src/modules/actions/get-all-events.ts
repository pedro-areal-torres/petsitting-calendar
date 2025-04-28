'use server';

import { db } from '@/db/drizzle';

export type Events = Awaited<ReturnType<typeof getAllEvents>>;

export const getAllEvents = async () => {
  const events = await db.query.events.findMany({
    with: {
      bookings: {
        with: {
          pet: true,
        },
      },
    },
  });

  return events;
};
