import { getAllEvents } from '@/modules/calendar/actions/get-all-events';
import Calendar from '@/modules/calendar/pages/Calendar';

export default async function Home() {
  const events = await getAllEvents();

  return <Calendar events={events} />;
}

export const revalidate = 60;
