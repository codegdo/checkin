import React from 'react';
import { CalendarEvent } from './calendar.event';


export const CalendarBody: React.FC = (): JSX.Element => {


  return (
    <div>
      <CalendarEvent />
    </div>
  )
}




/*
const currentDate = new Date();
  const startMonth = startOfMonth(currentDate);
  const endMonth = endOfMonth(startMonth);
  const startDate = startOfWeek(startMonth);
  const endDate = endOfWeek(endMonth);

  console.log('startMonth', startMonth);
  console.log('endMonth', endMonth);
  console.log('startDate', startDate);
  console.log('endDate', endDate);



  let day = startDate;
  const days = [];

  while (day <= endDate) {
    days.push({
      date: day
    });
    day = addDays(day, 1);
  }

  const result = days.reduce((array: any, item, index) => {
    const chunk = Math.floor(index / 7);

    if (!array[chunk]) {
      array[chunk] = []
    }

    array[chunk].push(item);

    return array;
  }, []);

  console.log(result);

  console.log(addMonths(currentDate, 1))
*/