import React from 'react';

import { CalendarControlProps } from './calendar.type';
import { ControlButton } from './control.button';
import { ControlMonth } from './control.month';
import { ControlPicker } from './control.picker';

export const CalendarControl: React.FC<CalendarControlProps> = ({ className = "calendar-control" }): JSX.Element => {
  return (
    <div className={className}>
      <ControlMonth />
      <ControlPicker />
      <ControlButton />
    </div>
  )
}