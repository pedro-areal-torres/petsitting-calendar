import React from 'react';
import { useCalendarContext } from '../../context/CalendarProvider';
import { format, getMonth } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export default function CalendarHeader() {
  const { today, currentMonth, previousMonth, nextMonth } = useCalendarContext();

  return (
    <header className='flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none'>
      <h1 className='text-base font-semibold text-gray-900'>{format(currentMonth, 'MMM-yyyy')}</h1>
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
  );
}
