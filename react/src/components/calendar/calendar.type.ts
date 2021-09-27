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
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<any>>,
  setView?: React.Dispatch<React.SetStateAction<any>>,
  setEvents?: React.Dispatch<React.SetStateAction<any>>,
  setResources?: React.Dispatch<React.SetStateAction<any>>,
  setInvalid?: React.Dispatch<React.SetStateAction<any>>
}

export type CalendarContextProps = CalendarProps | undefined