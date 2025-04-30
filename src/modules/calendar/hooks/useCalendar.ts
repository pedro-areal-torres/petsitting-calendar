import { useState } from 'react';
import { add, eachDayOfInterval, endOfMonth, startOfMonth, startOfToday, sub } from 'date-fns';

export const useCalendar = () => {
  const today = startOfToday();

  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(today);

  const firstDayCurrentMonth = startOfMonth(currentMonth);

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  const nextMonth = () => {
    setCurrentMonth(add(firstDayCurrentMonth, { months: 1 }));
  };

  const previousMonth = () => {
    setCurrentMonth(sub(firstDayCurrentMonth, { months: 1 }));
  };

  const colStartClasses = [
    'col-start-7',
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
  ];

  return {
    today,
    currentMonth,
    firstDayCurrentMonth,
    previousMonth,
    nextMonth,
    days,
    selectedDay,
    setSelectedDay,
    colStartClasses,
  };
};
