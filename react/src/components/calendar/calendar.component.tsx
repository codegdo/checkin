import React from 'react';
import { CalendarBody } from './calendar.body';
import { CalendarHeader } from './calendar.header';

import { CalendarContextProps } from './calendar.type';

export const CalendarContext = React.createContext<CalendarContextProps>(undefined);

export const Calendar: React.FC = (): JSX.Element => {

  const view = React.useMemo(() => {
    return {
      schedule: { type: 'day' }
    };
  }, []);

  return (
    <div>
      <CalendarContext.Provider value={{ view }}>
        <CalendarHeader />
        <CalendarBody />
      </CalendarContext.Provider>
    </div>
  )
}