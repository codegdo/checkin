export type ViewOptions = {
  type: 'month' | 'week' | 'day' | 'list';
  className?: string;
  allDay?: boolean;
  startTime?: string;
  endTime?: string;
}

export type CalendarProps = {
  loading?: string;
  view: ViewOptions;
  events?: any;
  resources?: any;
  invalid?: any;

  setView?: React.Dispatch<React.SetStateAction<any>>,
  setEvents?: React.Dispatch<React.SetStateAction<any>>,
  setResources?: React.Dispatch<React.SetStateAction<any>>,
  setInvalid?: React.Dispatch<React.SetStateAction<any>>
}

export type CalendarContextProps = {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<any>>
} & CalendarProps | undefined

export type CalendarControlProps = {
  className?: string;
}

export type CalendarTimelineProps = {
  className?: string;
  label?: boolean;
  timelines?: any;
}

export type CalendarTimerProps = {
  className?: string;
  startTime?: string;
  endTime?: string;
}

export type HeaderDayProps = {
  resources?: any;
  currentDate?: Date;
}

export type HeaderWeekProps = {
  resources?: any;
  currentDate?: Date;
}

export type HeaderMonthProps = {
  currentDate?: Date;
}

export type DayNameProps = {
  name?: string;
  day?: Date;
  isCurrent?: boolean;
}

export type ControlButtonProps = {
  handlePrevious: () => void;
  handleNext: () => void;
  handleToday: () => void;
}

export type ControlPickerProps = {
  handleMonth: () => void;
  handleWeek: () => void;
  handleDay: () => void;
  handleList: () => void;
}

export type ControlMonthProps = {
  handleDate: (date: Date) => void
  day: Date;
}

