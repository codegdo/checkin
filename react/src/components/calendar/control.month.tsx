import React, { useEffect, useRef, useState } from 'react';
import { format, addYears, subYears, monthsToYears, monthsInYear, monthsToQuarters, getMonth, getYear, eachYearOfInterval, differenceInYears, startOfMonth, endOfMonth, } from "date-fns";


import { ControlMonthProps } from './calendar.type';
import { useToggle } from '../../hooks';
import { getAllMonths, getYearsRange } from '../../helpers';

export const ControlMonth: React.FC<ControlMonthProps> = ({ day, handleDate }): JSX.Element => {

  const ddRef = useRef(null);

  const { current } = useRef({
    month: format(day, 'M'),
    year: format(day, 'yyyy')
  });

  const [isToggle, setIsToggle] = useToggle(ddRef, false);
  const onToggle = () => setIsToggle(!isToggle);

  const [months, setMonths] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);


  useEffect(() => {
    const yearsRange = getYearsRange(getYear(subYears(day, 6)));
    const monthsRange = getAllMonths();
    setYears(yearsRange);
    setMonths(monthsRange);
  }, [day])

  const handleMonth = (event: React.MouseEvent) => {
    const target = event.target as HTMLButtonElement;
    current.month = target.value;

    handleDate(new Date(+current.year, +current.month, +format(day, 'dd')));
  }

  const handleYear = (event: React.MouseEvent) => {
    const target = event.target as HTMLButtonElement;
    current.year = target.value;
  }

  const handlePrevious = (): void => {
    const year = years.at(0);
    year && setYears(getYearsRange(year - 12));
  };

  const handleNext = (): void => {
    const year = years.at(-1);
    year && setYears(getYearsRange(year + 1));
  };

  return (
    <div ref={ddRef} className={`${isToggle ? '-open' : ''}`}>
      <button type="button" onClick={onToggle}>{format(day, 'MMMM')} {format(day, 'yyyy')}</button>

      <div aria-expanded={isToggle}>
        <div>
          <span>{years.at(0)} - {years.at(-1)}</span>
          <span>
            <button type="button" onClick={handlePrevious}>Pre</button>
            <button type="button" onClick={handleNext}>Next</button>
          </span>
        </div>
        <div>
          <div>
            {
              years.map((year) => {
                return <button key={year} type="button" value={year} onClick={handleYear}>{year}</button>
              })
            }
          </div>
          <div>
            {
              months.map((month, i) => {
                return <button key={month} type="button" value={i} onClick={handleMonth}>{month}</button>
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}
