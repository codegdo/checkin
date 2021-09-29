import React, { useContext } from 'react';
import { CalendarContext } from './calendar.component';
import { CalendarDay } from './calendar.day';
import { CalendarMonth } from './calendar.month';
import { CalendarWeek } from './calendar.week';


export const CalendarBody: React.FC = (): JSX.Element | null => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error('Require calendar.body nested nn calendar.context');
  }

  const { view } = context;
  const { type } = view || {};

  return (
    <div className="calendar-body">
      {
        type === 'day' && <CalendarDay />
      }
      {
        type === 'week' && <CalendarWeek />
      }
      {
        type === 'month' && <CalendarMonth />
      }
    </div>
  )
}
