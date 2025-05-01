'use client';

import { Events } from '@/modules/calendar/actions/get-all-events';
import { isSameDay } from 'date-fns';
import { ClockIcon } from '@heroicons/react/20/solid';
import { useCalendarContext } from '../../context/CalendarProvider';
import { getHourMinuteFromTime } from '../../utils/get-hour-minute-from-time';

interface Props {
  events: Events;
}

export default function EventsListMobile({ events }: Props) {
  const { selectedDay } = useCalendarContext();

  const bookings = events.find((event) => isSameDay(selectedDay, event.date))?.bookings || [];

  return (
    <>
      {bookings.map((booking) => (
        <div className='py-2 sm:px-6 lg:hidden' key={booking.id}>
          <ol className='divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow-sm ring-1 ring-black/5'>
            <li className='group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50'>
              <div className='flex w-full flex-row items-center justify-between'>
                <p className='font-semibold text-gray-900'>{booking.pet.name}</p>
                <time className='flex items-center text-gray-400'>
                  <ClockIcon className='mr-2 size-5' aria-hidden='true' />
                  {`${getHourMinuteFromTime(booking.startTime)} - 
                  ${getHourMinuteFromTime(booking.endTime)}`}
                </time>
              </div>
            </li>
          </ol>
        </div>
      ))}
    </>
  );
}
