import { cn } from '@/modules/common/lib/tw-merge';
import {
  EachDayOfIntervalResult,
  format,
  getDay,
  getWeeksInMonth,
  isBefore,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
} from 'date-fns';
import React from 'react';
import { Events } from '../../actions/get-all-events';
import { useCalendarContext } from '../../context/CalendarProvider';
import { Paw } from '../icons/Paw';

interface Props {
  days: EachDayOfIntervalResult<
    {
      start: Date;
      end: Date;
    },
    undefined
  >;
  events?: Events;
}

export default function CalendarDayMobile({ days, events }: Props) {
  const {
    currentMonth,
    setSelectedDay,
    firstDayCurrentMonth,
    selectedDay,
    colStartClasses,
    today,
  } = useCalendarContext();

  return (
    <div
      className={`isolate grid w-full grid-cols-7 gap-px lg:hidden grid-rows-${getWeeksInMonth(currentMonth)}`}
    >
      {days.map((day, dayIdx) => {
        const dayEvent = events?.find((event) => isSameDay(day, event.date));

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
              isBefore(day, today) && 'bg-gray-100',
            )}
          >
            <time
              dateTime={format(today, 'dd MM yyyy')}
              className={cn(
                isEqual(day, selectedDay) && 'flex size-6 items-center justify-center rounded-full',
                isEqual(day, selectedDay) && isToday(day) && 'bg-indigo-600',
                isEqual(day, selectedDay) && !isToday(day) && 'bg-gray-900',
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
  );
}
