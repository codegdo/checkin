import React from 'react';
import { format } from "date-fns";
import { getMonthDays } from '../../helpers';
import { splitChunks } from '../../utils';

export const CalendarEvent: React.FC = (): JSX.Element => {

  const currentDate = new Date();
  const monthDays = getMonthDays(currentDate);
  const chunkDays = splitChunks(monthDays, 7);

  return (
    <div>
      {
        chunkDays.map((row: any, i: number) => {
          return <div key={i} className="calendar-row">
            {
              row.map((day: any, j: number) => {
                return <div key={j} className="calendar-cell">{format(day, 'd')}</div>
              })
            }
          </div>
        })
      }
    </div>
  )
}