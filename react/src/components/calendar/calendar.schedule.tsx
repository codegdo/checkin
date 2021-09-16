import React from 'react';
import { format } from "date-fns";
import { getMonthDays, getIntervalTimes } from '../../helpers';
import { splitChunks } from '../../utils';

export const CalendarSchedule: React.FC = (): JSX.Element => {

  const currentDate = new Date();
  const monthDays = getMonthDays(currentDate);
  const chunkDays = splitChunks(monthDays, 7);
  const timeIntervals = getIntervalTimes('8:00 AM', '8:00 PM', 15);

  return (
    <div>
      <table>
        <tbody>
          {
            chunkDays.map((row: any, i: number) => {
              return <tr key={i}>
                {
                  row.map((day: any, j: number) => {
                    return <td key={j}>{format(day, 'd')}</td>
                  })
                }
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}