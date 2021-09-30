import React, { useContext } from 'react';
import { CalendarContext } from './calendar.component';
import { addMonths, addDays, subMonths, subDays } from "date-fns";

import { CalendarControlProps } from './calendar.type';
import { ControlButton } from './control.button';
import { ControlMonth } from './control.month';
import { ControlPicker } from './control.picker';

export const CalendarControl: React.FC<CalendarControlProps> = ({ className = "calendar-control" }): JSX.Element => {

  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error('Require CALENDAR HEADER Nested In CALENDAR CONTEXT');
  }

  const { view, currentDate, setCurrentDate, setView } = context;

  const handleMonth = () => {
    setView && setView({ ...view, type: 'month' });
  }

  const handleWeek = () => {
    setView && setView({ ...view, type: 'week' });
  }

  const handleDay = () => {
    setView && setView({ ...view, type: 'day' });
  }

  const handleList = () => {
    setView && setView({ ...view, type: 'list' });
  }

  const handlePrevious = (): void => {
    if (setCurrentDate) {
      switch (view.type) {
        case 'month':
          setCurrentDate(subMonths(currentDate, 1));
          break;
        case 'week':
          setCurrentDate(subDays(currentDate, 7));
          break;
        case 'day':
          setCurrentDate(subDays(currentDate, 1));
          break;
      }
    }
  };

  const handleNext = (): void => {
    if (setCurrentDate) {
      switch (view.type) {
        case 'month':
          setCurrentDate(addMonths(currentDate, 1));
          break;
        case 'week':
          setCurrentDate(addDays(currentDate, 7));
          break;
        case 'day':
          setCurrentDate(addDays(currentDate, 1));
          break;
      }
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  }

  return (
    <div className={className}>
      <ControlMonth day={currentDate} />
      <ControlPicker
        handleMonth={handleMonth}
        handleWeek={handleWeek}
        handleDay={handleDay}
        handleList={handleList}
      />
      <ControlButton
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        handleToday={handleToday} />
    </div>
  )
}