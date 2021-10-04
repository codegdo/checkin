import React, { useContext } from 'react';
import { format, isToday, isThisMonth } from "date-fns";

import { getMonthDays } from '../../helpers';
import { splitChunks } from '../../utils';
import { CalendarContext } from './calendar.component';

export const CalendarMonth: React.FC = (): JSX.Element => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error('Require FORMFIELD Nested In FORMCONTEXT');
  }

  const { currentDate = new Date() } = context;

  const monthDays = getMonthDays(currentDate);
  const chunkDays = splitChunks(monthDays, 7);

  return (
    <div className="calendar-month">
      {
        chunkDays.map((row: Date[], i: number) => {
          return <div key={i} className="flex">
            {
              row.map((day: Date, j: number) => {

                //const isCurrent = isToday(day);
                //const isCurrentMonth = isThisMonth(day);

                return <div key={j} className="flex-col flex-1">
                  <div>
                    <span>{format(day, 'd')}</span>
                  </div>
                </div>
              })
            }
          </div>
        })
      }
    </div>
  )
}
