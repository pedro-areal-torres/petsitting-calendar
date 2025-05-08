'use client';

import { Events } from '@/modules/calendar/actions/get-all-events';
import CalendarDayDesktop from '../components/calendar/CalendarDayDesktop';
import CalendarDayMobile from '../components/calendar/CalendarDayMobile';
import { useCalendarContext } from '../context/CalendarProvider';
import EventsListMobile from '../components/events/EventsListMobile';
import { WEEKDAYS } from '../constants/weekdays';
import CalendarHeader from '../components/calendar/CalendarHeader';

interface Props {
  events: Events;
}

export default function Calendar({ events }: Props) {
  const { days } = useCalendarContext();

  return (
    <div className='flex h-full flex-col justify-center p-2 lg:pt-20'>
      <CalendarHeader />
      <div className='shadow-sm ring-1 ring-black/5 lg:flex lg:flex-auto lg:flex-col'>
        <div className='grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs/6 font-semibold text-gray-700 lg:flex-none'>
          {WEEKDAYS.map((day) => (
            <div key={day} className='bg-white py-2'>
              <span className='block sm:hidden'>{day.charAt(0)}</span>
              <span className='sr-only sm:not-sr-only'>{day}</span>
            </div>
          ))}
        </div>
        <div className='flex bg-gray-200 text-xs/6 text-gray-700 lg:flex-auto'>
          <CalendarDayDesktop days={days} events={events} />
          <CalendarDayMobile days={days} events={events} />
        </div>
      </div>
      <div className='flex flex-row items-center justify-center gap-4 py-2'>
        <div className='flex flex-row items-center justify-center gap-1'>
          <span className='h-4 w-4 rounded-full border bg-yellow-200' />
          <p className='text-sm'>Unknown</p>
        </div>
        <div className='flex flex-row items-center justify-center gap-1'>
          <span className='h-4 w-4 rounded-full border bg-red-300' />
          <p className='text-sm'>Unavailable / Fully booked</p>
        </div>
      </div>
      <EventsListMobile events={events} />
    </div>
  );
}
