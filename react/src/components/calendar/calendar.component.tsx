import React, { useState } from 'react';

import { CalendarControl } from './calendar.control';
import { CalendarHeader } from './calendar.header';
import { CalendarBody } from './calendar.body';
import { CalendarContextProps, CalendarProps } from './calendar.type';

export const CalendarContext = React.createContext<CalendarContextProps>(undefined);

export const Calendar: React.FC<CalendarProps> = ({ view, resources }): JSX.Element => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="calendar">
      <CalendarContext.Provider value={{ currentDate, view, resources, setCurrentDate }}>
        <CalendarControl />
        <CalendarHeader />
        <CalendarBody />
      </CalendarContext.Provider>
    </div>
  )
}