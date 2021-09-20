import React, { useContext } from 'react';
import { format } from "date-fns";

import { getWeekDays } from '../../helpers';

import { CalendarContext } from './calendar.component';
import { CalendarWeekProps } from './calendar.type';

export const CalendarWeek: React.FC<CalendarWeekProps> = ({ pattern = 'dayname' }): JSX.Element => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error('Require FORMFIELD Nested In FORMCONTEXT');
  }

  const { currentDate } = context;



  const weekDays = getWeekDays(currentDate);

  return <>
    {
      weekDays.map((day, i) => {
        return <div key={i} className="calendar-column">
          {
            pattern == 'name' &&
            <div>{format(day, 'eee')}</div>
          }
          {
            pattern == 'day' &&
            <div>{format(day, 'dd')}</div>
          }
          {
            pattern == 'dayname' && <>
              <div>{format(day, 'eeeeee')}</div>
              <div>{format(day, 'dd')}</div>
            </>
          }
        </div>
      })
    }
  </>
}