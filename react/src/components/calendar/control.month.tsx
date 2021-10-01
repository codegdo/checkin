import React, { useEffect, useRef, useState } from 'react';
import { format, addYears, subYears, monthsToYears, monthsInYear, monthsToQuarters, getMonth, getYear, eachYearOfInterval, differenceInYears, startOfMonth, endOfMonth, } from "date-fns";


import { ControlMonthProps } from './calendar.type';
import { useToggle } from '../../hooks';
import { getAllMonths, getYearsRange } from '../../helpers';

export const ControlMonth: React.FC<ControlMonthProps> = ({ day, handleDate }): JSX.Element => {

  const ddRef = useRef(null);

  const yrRef = useRef({
    month: format(day, 'M'),
    year: format(day, 'yyyy')
  });

  const [isToggle, setIsToggle] = useToggle(ddRef, false);
  const onToggle = () => setIsToggle(!isToggle);

  const [months, setMonths] = useState(getAllMonths());
  const [years, setYears] = useState([]);


  useEffect(() => {
    const yearsRange = getYearsRange(getYear(subYears(day, 6)));
    setYears(yearsRange);
  }, [day])

  const handleMonth = (event: React.MouseEvent) => {
    const target = event.target as HTMLButtonElement;
    yrRef.current.month = target.value;

    handleDate(new Date(+yrRef.current.year, +yrRef.current.month, +format(day, 'dd')));
    console.log(yrRef.current);
  }

  const handleYear = (event: React.MouseEvent) => {
    const target = event.target as HTMLButtonElement;
    yrRef.current.year = target.value;

    console.log(yrRef.current);
  }

  const handlePrevious = (): void => {
    //subYears();
    setYears(getYearsRange(years.at(0) - 12));
  };

  const handleNext = (): void => {
    //addYears()
    setYears(getYearsRange(years.at(-1) + 1));
  };

  return (
    <div ref={ddRef} aria-expanded={isToggle}>
      <button type="button" onClick={onToggle}>{format(day, 'MMMM')} {format(day, 'yyyy')}</button>

      <div>
        <span>{years.at(0)} - {years.at(-1)}</span>
        <button type="button" onClick={handlePrevious}>Pre</button>
        <button type="button" onClick={handleNext}>Next</button>
        <div>
          <div>
            {
              months.map((month, i) => {
                return <button key={month} type="button" value={i} onClick={handleMonth}>{month}</button>
              })
            }
          </div>
          <div>
            {
              years.map((year) => {
                return <button key={year} type="button" value={year} onClick={handleYear}>{year}</button>
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}
