'use client';

import { Events } from '@/modules/calendar/actions/get-all-events';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { format, getMonth } from 'date-fns';
import CalendarDayDesktop from '../components/calendar-days/CalendarDayDesktop';
import CalendarDayMobile from '../components/calendar-days/CalendarDayMobile';
import { useCalendarContext } from '../context/CalendarProvider';
import EventsListMobile from '../components/events/EventsListMobile';

interface Props {
  events: Events;
}

export default function Calendar({ events }: Props) {
  const { today, currentMonth, previousMonth, nextMonth, days } = useCalendarContext();

  return (
    <div className='flex h-full flex-col justify-center p-2 lg:pt-20'>
      <header className='flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none'>
        <h1 className='text-base font-semibold text-gray-900'>
          {format(currentMonth, 'MMM-yyyy')}
        </h1>
        <div className='flex items-center'>
          <div className='relative flex items-center rounded-md bg-white shadow-xs md:items-stretch'>
            <button
              type='button'
              onClick={() => previousMonth()}
              disabled={getMonth(today) === getMonth(currentMonth)}
              className='flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50'
            >
              <span className='sr-only'>Previous month</span>
              <ChevronLeftIcon className='size-5' aria-hidden='true' />
            </button>
            <span className='relative -mx-px h-5 w-px bg-gray-300 md:hidden' />
            <button
              type='button'
              onClick={() => nextMonth()}
              className='flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50'
            >
              <span className='sr-only'>Next month</span>
              <ChevronRightIcon className='size-5' aria-hidden='true' />
            </button>
          </div>
        </div>
      </header>
      <div className='shadow-sm ring-1 ring-black/5 lg:flex lg:flex-auto lg:flex-col'>
        <div className='grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs/6 font-semibold text-gray-700 lg:flex-none'>
          <div className='bg-white py-2'>
            M<span className='sr-only sm:not-sr-only'>on</span>
          </div>
          <div className='bg-white py-2'>
            T<span className='sr-only sm:not-sr-only'>ue</span>
          </div>
          <div className='bg-white py-2'>
            W<span className='sr-only sm:not-sr-only'>ed</span>
          </div>
          <div className='bg-white py-2'>
            T<span className='sr-only sm:not-sr-only'>hu</span>
          </div>
          <div className='bg-white py-2'>
            F<span className='sr-only sm:not-sr-only'>ri</span>
          </div>
          <div className='bg-white py-2'>
            S<span className='sr-only sm:not-sr-only'>at</span>
          </div>
          <div className='bg-white py-2'>
            S<span className='sr-only sm:not-sr-only'>un</span>
          </div>
        </div>
        <div className='flex bg-gray-200 text-xs/6 text-gray-700 lg:flex-auto'>
          <CalendarDayDesktop days={days} events={events} />
          <CalendarDayMobile days={days} events={events} />
        </div>
      </div>
      <div className='flex flex-row items-center justify-center gap-4 pt-2'>
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
