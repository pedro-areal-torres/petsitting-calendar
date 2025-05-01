import { Events } from '@/modules/calendar/actions/get-all-events';
import {
  EachDayOfIntervalResult,
  format,
  getDay,
  getWeeksInMonth,
  isSameDay,
  isSameMonth,
  isToday,
} from 'date-fns';
import { useCalendarContext } from '../../context/CalendarProvider';
import { cn } from '@/modules/common/lib/tw-merge';
import { getHourMinuteFromTime } from '../../utils/get-hour-minute-from-time';

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

export default function CalendarDayDesktop({ days, events }: Props) {
  const { currentMonth, firstDayCurrentMonth, colStartClasses, today } = useCalendarContext();

  return (
    <div
      className={`hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-${getWeeksInMonth(currentMonth)} lg:gap-px`}
    >
      {days.map((day, dayIdx) => {
        const dayEvent = events?.find((event) => isSameDay(event.date, day));
        return (
          <div
            key={day.toString()}
            className={cn(
              isSameMonth(day, firstDayCurrentMonth) ? 'bg-white' : 'bg-gray-50 text-gray-500',

              'relative min-h-24 px-3 py-2',
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
            {dayEvent?.bookings && dayEvent.bookings.length > 0 ? (
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
                        {`${getHourMinuteFromTime(booking.startTime)} - 
                                            ${getHourMinuteFromTime(booking.endTime)}`}
                      </time>
                    </div>
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
