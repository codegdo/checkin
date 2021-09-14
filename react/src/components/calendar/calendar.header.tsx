import React, { useState } from 'react';
import { addDays, format, startOfWeek } from "date-fns";


export const CalendarHeader: React.FC = (): JSX.Element => {
  const dateFormat = "ddd";
  const currentDate = new Date();
  const startDate = startOfWeek(currentDate);

  return <div>
    {
      [...Array(7)].map((_x, i) => {
        return <div>
          {
            format(addDays(startDate, i), dateFormat)
          }
        </div>
      })
    }
  </div>
}