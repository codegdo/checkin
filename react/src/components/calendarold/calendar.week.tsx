import React, { useContext } from 'react';
import { format, isToday } from "date-fns";

import { getWeekDays } from '../../helpers';

import { CalendarContext } from './calendar.component';
import { CalendarWeekProps } from './calendar.type';

export const CalendarWeek: React.FC<CalendarWeekProps> = ({ pattern = 'dayname' }): JSX.Element => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error('Require FORMFIELD Nested In FORMCONTEXT');
  }

  const { currentDate = new Date() } = context;

  const weekDays = getWeekDays(currentDate);

  return <>
    {
      weekDays.map((day, i) => {
        return <div key={i} className="flex-col flex-1-1">
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
              <div className={`${isToday(day) ? '-selected' : ''}`}>{format(day, 'dd')}</div>
            </>
          }
        </div>
      })
    }
  </>
}