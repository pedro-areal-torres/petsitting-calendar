import { Events } from '@/modules/calendar/actions/get-all-events';

interface Props {
  day: number;
  dayIdx: number;
  events?: Events[];
}

export default function CalendarDayDesktop({}: Props) {}
