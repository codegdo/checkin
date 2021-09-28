import React from 'react';

import { HeaderDayProps } from './calendar.type';
import { DayLabel } from './day.label';

export const HeaderDay: React.FC<HeaderDayProps> = ({ resources, currentDate = new Date() }): JSX.Element => {

  return (
    <>
      <DayLabel day={currentDate} pattern="dayname" />
      <div className="flex">
        {
          resources.map((resource: any, i: number) => {
            return <div key={i} className="flex-col flex-1">
              {resource.name}
            </div>
          })
        }
      </div>
    </>
  )
}