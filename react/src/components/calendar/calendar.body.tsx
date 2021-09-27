import React, { useContext } from 'react';
import { CalendarContext } from './calendar.component';


export const CalendarBody: React.FC = (): JSX.Element | null => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error('Require FORMFIELD Nested In FORMCONTEXT');
  }

  const { view } = context;

  return (
    <div className="calendar-body">

    </div>
  )
}
