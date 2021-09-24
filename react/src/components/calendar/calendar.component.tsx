import React from 'react';
import { CalendarContextProps, CalendarProps } from './calendar.type';

export const CalendarContext = React.createContext<CalendarContextProps>(undefined);

export const Calendar: React.FC<CalendarProps> = (): JSX.Element => {

  return (
    <div className="schedule">
      <CalendarContext.Provider value={{}}>

      </CalendarContext.Provider>
    </div>
  )
}