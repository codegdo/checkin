import React, { useContext } from 'react';
import { format, subMonths, addMonths, addDays, subDays } from "date-fns";

import { CalendarContext } from './calendar.component';


export const CalendarHeader: React.FC = (): JSX.Element => {

  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error('Require FORMFIELD Nested In FORMCONTEXT');
  }

  const { view, currentDate = new Date(), setCurrentDate } = context;
  const { schedule, event, agenda } = view;
  const { type } = schedule || event || agenda;

  const handleNext = () => {
    switch (type) {
      case 'month':
        setCurrentDate && setCurrentDate(addMonths(currentDate, 1));
        break;
      case 'week':
        setCurrentDate && setCurrentDate(addDays(currentDate, 7));
        break;
      default:
        setCurrentDate && setCurrentDate(addDays(currentDate, 1));
    }
  }

  const handlePrevious = () => {
    switch (type) {
      case 'month':
        setCurrentDate && setCurrentDate(subMonths(currentDate, 1));
        break;
      case 'week':
        setCurrentDate && setCurrentDate(subDays(currentDate, 7));
        break;
      default:
        setCurrentDate && setCurrentDate(subDays(currentDate, 1));
    }
  }

  return (
    <div className="calendar-header">
      <div></div>
      <div className="calendar-buttons">
        <button type="button" onClick={handlePrevious}><i className="icon">navigate_before</i></button>
        <span onClick={() => setCurrentDate && setCurrentDate(new Date())}>Today</span>
        <button type="button" onClick={handleNext}><i className="icon">navigate_next</i></button>
      </div>
    </div>
  )
}