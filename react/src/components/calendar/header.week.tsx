import React from 'react';
import { format, isToday } from "date-fns";

import { getWeekDays } from '../../helpers';
import { HeaderWeekProps } from './calendar.type';

export const HeaderWeek: React.FC<HeaderWeekProps> = ({ resources, currentDate = new Date() }): JSX.Element => {

  const weekDays = getWeekDays(currentDate);

  return resources ?
    <div className="flex">
      {
        resources.map((resource: any, i: number) => {
          return <div key={i} className="flex-col flex-1">

            <div>{resource.name}</div>

            <div className="flex">
              {
                weekDays.map((day, j) => {
                  return <div key={j} className="flex-col flex-1">
                    <div>
                      <span>{format(day, 'eee')}</span>
                      <span>{format(day, 'd')}</span>
                    </div>
                  </div>
                })
              }
            </div>

          </div>
        })
      }
    </div>
    :
    <div className="flex">
      {
        weekDays.map((day, i) => {
          return <div key={i} className="flex-col flex-1">
            <div>
              <span>{format(day, 'eee')}</span>
              <span>{format(day, 'd')}</span>
            </div>
          </div>
        })
      }
    </div>
}