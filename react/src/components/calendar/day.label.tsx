import React from 'react';
import { format, isToday } from "date-fns";

import { DayLabelProps } from './calendar.type';

export const DayLabel: React.FC<DayLabelProps> = ({ day = new Date(), pattern = 'dayname' }): JSX.Element => {

  const selected = isToday(day) ? '-selected' : '';

  return <div className={selected}>
    {
      pattern == 'day' &&
      <div>{format(day, 'eee')}</div>
    }
    {
      pattern == 'dayname' && <>
        <span>{format(day, "eeee")}</span>
        <span>{format(day, "dd")}</span>
      </>
    }
    {
      pattern == 'weekname' && <>
        <span>{format(day, 'eee')}</span>
        <span>{format(day, 'dd')}</span>
      </>
    }
  </div>
}