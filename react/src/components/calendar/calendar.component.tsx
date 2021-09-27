import React, { useState } from 'react';

import { CalendarNav } from './calendar.nav';
import { CalendarHeader } from './calendar.header';
import { CalendarBody } from './calendar.body';
import { CalendarContextProps, CalendarProps } from './calendar.type';

export const CalendarContext = React.createContext<CalendarContextProps>(undefined);

export const Calendar: React.FC<CalendarProps> = ({ view }): JSX.Element => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="calendar">
      <CalendarContext.Provider value={{ currentDate, view, setCurrentDate }}>
        <CalendarNav />
        <CalendarHeader />
        <CalendarBody />
      </CalendarContext.Provider>
    </div>
  )
}