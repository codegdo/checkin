import React, { useContext } from 'react';
import { format } from "date-fns";

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
    <>
      {
        chunkDays.map((row: any, i: number) => {
          return <div key={i} className="flex">
            {
              row.map((day: any, j: number) => {
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
    </>
  )
}
