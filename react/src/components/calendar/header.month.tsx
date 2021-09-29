import React from 'react';
import { format } from "date-fns";

import { getWeekDays } from '../../helpers';
import { HeaderMonthProps } from './calendar.type';

export const HeaderMonth: React.FC<HeaderMonthProps> = ({ currentDate = new Date() }): JSX.Element => {

  const weekDays = getWeekDays(currentDate);

  return (
    <div className="flex">
      {
        weekDays.map((day, i) => {
          return <div key={i} className="flex-col flex-1">
            <div>
              <span>{format(day, 'eee')}</span>
            </div>
          </div>
        })
      }
    </div>
  )
}