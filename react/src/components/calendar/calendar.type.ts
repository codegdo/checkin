export type ViewOptions = {
  type: 'month' | 'week' | 'day' | 'list';
  className: string;
  allDay: boolean;
  startTime: string;
  endTime: string;
}

export type CalendarProps = {
  loading?: string;
  view?: ViewOptions;
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

export type DayLabelProps = {
  pattern?: string;
  day?: Date;
}