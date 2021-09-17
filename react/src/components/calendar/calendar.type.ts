
type ViewOption = {
  type: string;
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
  theme?: string;
  view?: any;
  events?: any;
  resources?: any;
} | undefined

export type CalendarProps = {
  theme?: string;
  view?: CalendarView;
  events?: any;
  resources?: any;
}