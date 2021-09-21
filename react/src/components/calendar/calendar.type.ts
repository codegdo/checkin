
type ViewOption = {
  type: string;
  allDay: boolean;
  startTime: string;
  endTime: string;
}

type AgendaView = ViewOption;
type EventView = ViewOption;
type ScheduleView = ViewOption;

type CalendarView = {
  agenda: AgendaView;
  event: EventView;
  schedule: ScheduleView;
}

export type CalendarContextProps = {
  setCurrentDate?: React.Dispatch<React.SetStateAction<Date>>;
  currentDate?: Date;
  theme?: string;
  view?: any;
  events?: any;
  resources?: any;
  invalid?: any;
  values?: any;
} | undefined

export type CalendarProps = {
  theme?: string;
  view?: CalendarView;
  events?: any;
  resources?: any;
  invalid?: any;
}

export type CalendarCellProps = {
  className?: string;
  label?: boolean;
}

export type CalendarTimelineProps = {
  className?: string;
  label?: boolean;
  timelines?: any;
}

export type CalendarTimerProps = {
  className?: string;
  offset?: number;
  remaining?: number;
  total?: number;
}

export type CalendarWeekProps = {
  className?: string;
  pattern?: string;
}