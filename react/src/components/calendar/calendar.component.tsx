import React from 'react';
import { CalendarBody } from './calendar.body';
import { CalendarHeader } from './calendar.header';

import { CalendarContextProps } from './calendar.type';

export const CalendarContext = React.createContext<CalendarContextProps>(undefined);

export const Calendar: React.FC = (): JSX.Element => {

  const view = React.useMemo(() => {
    return {
      schedule: {
        type: 'day',
        startTime: '6:00',
        endTime: '20:00'
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
    <div>
      <CalendarContext.Provider value={{ view, resources }}>
        <CalendarHeader />
        <CalendarBody />
      </CalendarContext.Provider>
    </div>
  )
}