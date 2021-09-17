import React from 'react';
import { format, getMinutes } from "date-fns";
import { getIntervalTimes } from '../../helpers';

export const CalendarSchedule: React.FC = (): JSX.Element => {

  const timeIntervals = getIntervalTimes('8:00 AM', '8:00 PM', 15);

  return (
    <div>

      {
        timeIntervals.map((interval: any, i: number) => {
          console.log(getMinutes(interval));
          return <div key={i}>
            {
              getMinutes(interval) == 0 ? format(interval, 'p') : ''
            }
          </div>
        })
      }
    </div>
  )
}

