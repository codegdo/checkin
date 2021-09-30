import React, { useRef } from 'react';
import { format } from "date-fns";

import { ControlMonthProps } from './calendar.type';
import { useToggle } from '../../hooks';

export const ControlMonth: React.FC<ControlMonthProps> = ({ day }): JSX.Element => {

  const ddRef = useRef(null);
  const [isToggle, setIsToggle] = useToggle(ddRef, false);
  const onToggle = () => setIsToggle(!isToggle);

  const handleClick = () => {
    onToggle();
  }

  return (
    <div ref={ddRef} aria-expanded={isToggle}>
      <button type="button" onClick={onToggle}>{format(day, 'MMMM')} {format(day, 'yyyy')}</button>
      <div>
        HEllo
        <button type="button" onClick={handleClick}>click</button>
      </div>
    </div>
  )
}
