'use client';

import { createContext, useContext } from 'react';
import { useCalendar } from '../hooks/useCalendar';

const CalendarContext = createContext<ReturnType<typeof useCalendar> | null>(null);

interface Props {
  children: React.ReactNode;
}

export const CalendarProvider = ({ children }: Props) => {
  const value = useCalendar();
  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
};

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error('useCalendarContext must be used within CalendarProvider');
  }

  return context;
};
