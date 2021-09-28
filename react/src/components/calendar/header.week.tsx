import React from 'react';
import { format, isToday } from "date-fns";

import { getWeekDays } from '../../helpers';
import { HeaderWeekProps } from './calendar.type';
import { DayLabel } from './day.label';

export const HeaderWeek: React.FC<HeaderWeekProps> = ({ resources = [], currentDate = new Date() }): JSX.Element => {

  const weekDays = getWeekDays(currentDate);

  return (
    <div className="flex">
      {
        resources.map((resource: any, i: number) => {
          return <div key={i} className="flex-col flex-1">

            <div>{resource.name}</div>

            <div className="flex">
              {
                weekDays.map((day, j) => {
                  return <div key={j} className="flex-col flex-1">
                    <DayLabel day={day} pattern="weekname" />
                  </div>
                })
              }
            </div>
          </div>
        })
      }
    </div>
  )
}