import React from 'react';
import { format, subMinutes, subHours, addHours, startOfDay, endOfDay } from "date-fns";
import { getMonthDays } from '../../helpers';
import { splitChunks } from '../../utils';

export const CalendarBody: React.FC = (): JSX.Element => {

  const currentDate = new Date();
  const monthDays = getMonthDays(currentDate);
  const chunkDays = splitChunks(monthDays, 7);

  console.log(format(currentDate, "p"));

  console.log(subMinutes(currentDate, 15));

  console.log(addHours(startOfDay(currentDate), 9));

  console.log(endOfDay(currentDate));

  return (
    <div>
      <table>
        <tbody>
          {
            chunkDays.map((row: any, i: number) => {
              return <tr key={i}>
                {
                  row.map((day: any, j: number) => {
                    return <td key={j}>{format(day, 'd')}</td>
                  })
                }
              </tr>
            })
          }
        </tbody>
      </table>
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