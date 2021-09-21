import React, { useRef, useState } from 'react';
import { format, subMonths, addMonths, addDays, subDays } from "date-fns";

import { CalendarBody } from './calendar.body';
import { CalendarHeader } from './calendar.header';

import { CalendarContextProps } from './calendar.type';

export const CalendarContext = React.createContext<CalendarContextProps>(undefined);

export const Calendar: React.FC = (): JSX.Element => {

  const { current: values } = useRef({ day: 0 });

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());


  const view = React.useMemo(() => {
    return {
      schedule: {
        type: 'day',
        startTime: '8:00',
        endTime: '16:00'
      }
    };
  }, []);

  const resources = React.useMemo(() => {
    return [{
      id: 1,
      name: 'Thanh',
      color: '#f7c4b4'
    }, {
      id: 2,
      name: 'Mana',
      color: '#c6f1c9'
    }];
  }, []);

  return (
    <div className="calendar">
      <CalendarContext.Provider value={{ view, resources, values, currentDate, setCurrentDate }}>
        <CalendarHeader />
        <CalendarBody />
      </CalendarContext.Provider>
    </div>
  )
}