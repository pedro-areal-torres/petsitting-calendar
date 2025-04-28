import { Events } from '@/modules/actions/get-all-events';

interface Props {
  day: number;
  dayIdx: number;
  events?: Events[];
}

export default function CalendarDayDesktop({}: Props) {}
