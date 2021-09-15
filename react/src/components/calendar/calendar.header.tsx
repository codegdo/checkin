import React from 'react';
import { format } from "date-fns";
import { getWeekDays } from '../../helpers';

export const CalendarHeader: React.FC = (): JSX.Element => {

  const currentDate = new Date();
  const weekDays = getWeekDays(currentDate)

  return (
    <div>
      <table>
        <thead>
          <tr>
            {
              weekDays.map((day, i) => {
                return <th key={i}>{format(day, 'eee')}</th>
              })
            }
          </tr>
        </thead>
      </table>
    </div>
  )
}