type ViewOptions = {
  type: 'month' | 'week' | 'day' | 'list';
  allDay: boolean;
  startTime: string;
  endTime: string;
}

export type CalendarContextProps = {
  theme?: string;
  view?: ViewOptions;
  events?: any;
  resources?: any;
  invalid?: any;
} | undefined

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