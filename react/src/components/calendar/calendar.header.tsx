import React, { useContext } from 'react';
import { CalendarContext } from './calendar.component';

import { HeaderDay } from './header.day';
import { HeaderMonth } from './header.month';
import { HeaderWeek } from './header.week';

export const CalendarHeader: React.FC = (): JSX.Element => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error('Require CALENDAR HEADER Nested In CALENDAR CONTEXT');
  }

  const { view, resources = [], currentDate } = context;
  const { type } = view || {};

  return (
    <div className="calendar-header">
      {
        type === 'day' && <HeaderDay currentDate={currentDate} resources={resources} />
      }
      {
        type === 'week' && <HeaderWeek currentDate={currentDate} resources={resources} />
      }
      {
        type === 'month' && <HeaderMonth currentDate={currentDate} />
      }
    </div>
  )
}