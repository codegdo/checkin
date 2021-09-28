import React from 'react';

import { getWeekDays } from '../../helpers';
import { HeaderMonthProps } from './calendar.type';
import { DayLabel } from './day.label';

export const HeaderMonth: React.FC<HeaderMonthProps> = ({ currentDate = new Date() }): JSX.Element => {

  const weekDays = getWeekDays(currentDate);

  return (
    <div className="flex">
      {
        weekDays.map((day, i) => {
          return <div key={i} className="flex-col flex-1">
            <DayLabel day={day} pattern="day" />
          </div>
        })
      }
    </div>
  )
}