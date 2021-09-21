import React, { useContext, useEffect, useState } from 'react';
import { format } from "date-fns";

import { CalendarContext } from './calendar.component';
import { CalendarTimerProps } from './calendar.type';

export const CalendarTimer: React.FC<CalendarTimerProps> = ({ offset = 0, remaining = 0, total = 0 }): JSX.Element => {

  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error('Require FORMFIELD Nested In FORMCONTEXT');
  }

  const { currentDate } = context;

  const today = new Date();
  const [currentTime, setCurrentTime] = useState(format(today, 'h:mm a'));
  const [minutes, setMinutes] = useState(offset);
  const [seconds, setSeconds] = useState(today.getSeconds());
  const [position, setPosition] = useState(offset * 2);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds < 60) {
        setSeconds(seconds + 1);
      }
      if (seconds === 60) {
        if (minutes === total) {
          clearInterval(interval);
        } else {
          setSeconds(0);
          setMinutes(minutes + 1);
          setPosition(position + 2);
          setCurrentTime(format(new Date, 'h:mm a'));
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, [minutes, seconds])
  return <div className="schedule-timer" style={{ top: position }}>{currentTime}</div>
}