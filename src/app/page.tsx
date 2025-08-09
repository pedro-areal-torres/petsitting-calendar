import { getAllEvents } from '@/modules/calendar/actions/get-all-events';
import { CalendarProvider } from '@/modules/calendar/context/CalendarProvider';
import Calendar from '@/modules/calendar/pages/Calendar';

export default async function Home() {
  const events = await getAllEvents();

  return (
    <CalendarProvider>
      <Calendar events={events} />
    </CalendarProvider>
  );
}

export const dynamic = 'force-dynamic';
