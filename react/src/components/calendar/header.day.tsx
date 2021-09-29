import React from 'react';
import { format } from "date-fns";

import { HeaderDayProps } from './calendar.type';

export const HeaderDay: React.FC<HeaderDayProps> = ({ resources, currentDate = new Date() }): JSX.Element => {

  return (
    <>
      <div>
        <span>{format(currentDate, 'eeee')}</span>
        <span>{format(currentDate, 'd')}</span>
      </div>
      {
        resources && <div className="flex">
          {
            resources.map((resource: any, i: number) => {
              return <div key={i} className="flex-col flex-1">
                {resource.name}
              </div>
            })
          }
        </div>
      }
    </>
  )
}