import dayjs from 'dayjs';

export interface CalendarDay {
  date: string;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export interface CalendarMonth {
  name: string;
  year: number;
  days: CalendarDay[];
}

export function generateCalendarMonths(monthCount = 4): CalendarMonth[] {
  const today = dayjs();
  const months: CalendarMonth[] = [];

  for (let i = 0; i < monthCount; i++) {
    const monthDate = today.add(i, 'month').startOf('month');
    const daysInMonth = monthDate.daysInMonth();
    const days: CalendarDay[] = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const currentDate = monthDate.date(d);
      days.push({
        date: currentDate.format('YYYY-MM-DD'),
        isCurrentMonth: true,
        isToday: currentDate.isSame(today, 'day'),
      });
    }

    months.push({
      name: monthDate.format('MMMM YYYY'),
      year: monthDate.year(),
      days,
    });
  }

  return months;
}
