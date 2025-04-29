'use client';

import { useState } from 'react';
import { Events } from '@/modules/calendar/actions/get-all-events';
import { cn } from '@/modules/common/lib/tw-merge';
import { ChevronLeftIcon, ChevronRightIcon, ClockIcon } from '@heroicons/react/20/solid';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  getMonth,
  getWeeksInMonth,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  sub,
} from 'date-fns';
import { Paw } from '../components/icons/Paw';
import { getHourMinuteFromTime } from '../utils/get-hour-minute-from-time';

interface Props {
  events: Events;
}

const colStartClasses = [
  'col-start-7',
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
];

export default function Calendar({ events }: Props) {
  const today = startOfToday();

  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));

  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  };

  const previousMonth = () => {
    const firstDayPreviousMonth = sub(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayPreviousMonth, 'MMM-yyyy'));
  };

  return (
    <div className='flex h-full flex-col justify-center p-2 lg:pt-20'>
      <header className='flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none'>
        <h1 className='text-base font-semibold text-gray-900'>{currentMonth}</h1>
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
          <div
            className={`hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-${getWeeksInMonth(currentMonth)} lg:gap-px`}
          >
            {days.map((day, dayIdx) => {
              const dayEvent = events.find((event) => isSameDay(event.date, day));
              return (
                <div
                  key={day.toString()}
                  className={cn(
                    isSameMonth(day, firstDayCurrentMonth)
                      ? 'bg-white'
                      : 'bg-gray-50 text-gray-500',

                    'relative px-3 py-2',
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    dayEvent?.status === 'unavailable' && 'bg-red-300',
                    dayEvent?.status === 'unknown' && 'bg-yellow-200',
                  )}
                >
                  <time
                    dateTime={format(today, 'dd MM yyyy')}
                    className={
                      isToday(day)
                        ? 'flex size-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
                        : undefined
                    }
                  >
                    {format(day, 'd')}
                  </time>
                  <ol className='mt-2'>
                    {dayEvent?.bookings.map((booking) => (
                      <li key={booking.id}>
                        <div className='group flex'>
                          <p className='flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600'>
                            {booking.pet.name}
                          </p>
                          <time
                            dateTime={dayEvent.date}
                            className='ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block'
                          >
                            {booking.startTime.slice(0, 5)}
                          </time>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>
          <div
            className={`isolate grid w-full grid-cols-7 gap-px lg:hidden grid-rows-${getWeeksInMonth(currentMonth)}`}
          >
            {days.map((day, dayIdx) => {
              const dayEvent = events.find((event) => isSameDay(day, event.date));

              return (
                <button
                  type='button'
                  key={day.toString()}
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    isSameMonth(day, firstDayCurrentMonth) ? 'bg-white' : 'bg-gray-50',
                    (isEqual(day, selectedDay) || isToday(day)) && 'font-semibold',
                    isEqual(day, selectedDay) && 'text-white',
                    !isEqual(day, selectedDay) && isToday(day) && 'text-indigo-600',
                    !isEqual(day, selectedDay) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      !isToday(day) &&
                      'text-gray-900',
                    !isEqual(day, selectedDay) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      !isToday(day) &&
                      'text-gray-500',
                    'flex h-14 flex-col items-center px-3 py-2 hover:bg-gray-100 focus:z-10',
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    dayEvent?.status === 'unavailable' && 'bg-red-300',
                    dayEvent?.status === 'unknown' && 'bg-yellow-200',
                  )}
                >
                  <time
                    dateTime={format(today, 'dd MM yyyy')}
                    className={cn(
                      isEqual(day, selectedDay) &&
                        'flex size-6 items-center justify-center rounded-full',
                      isEqual(day, selectedDay) && isToday(day) && 'bg-indigo-600',
                      isEqual(day, selectedDay) && !isToday(day) && 'bg-gray-900',
                      'ml-auto',
                    )}
                  >
                    {format(day, 'd')}
                  </time>
                  {dayEvent?.bookings.map((booking) => (
                    <span className='-mx-0.5 mt-auto flex flex-wrap-reverse' key={booking.id}>
                      <Paw key={booking.petId} className='text-black' />
                    </span>
                  ))}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {events
        .find((event) => isSameDay(selectedDay, event.date))
        ?.bookings.map((booking) => (
          <div className='py-4 sm:px-6 lg:hidden' key={booking.id}>
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
    </div>
  );
}
