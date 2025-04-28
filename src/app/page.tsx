import { getAllEvents } from '@/modules/actions/get-all-events';
import Calendar from '@/modules/calendar/pages/Calendar';

export default async function Home() {
  const events = await getAllEvents();

  return (
    <div className='h-screen bg-gradient-to-t from-violet-100 to-fuchsia-50'>
      <Calendar events={events} />
    </div>
  );
}
