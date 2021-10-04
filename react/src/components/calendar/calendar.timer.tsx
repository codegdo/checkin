import React, { useEffect, useState } from 'react';
import { format } from "date-fns";

import { CalendarTimerProps } from './calendar.type';
import { useWindowFocus } from '../../hooks';
import { calculateTimeInterval, calculateTimeOffset } from '../../helpers';

type State = {
  currentTime: string;
  minutes: number;
  seconds: number;
  position: number;
}

export const CalendarTimer: React.FC<CalendarTimerProps> = ({ startTime, endTime }): JSX.Element | null => {

  const today = new Date();
  const offset = calculateTimeOffset(startTime);
  const total = calculateTimeInterval(startTime, endTime);

  const focused = useWindowFocus();

  if (offset < 0 || offset > total) {
    return null;
  }

  const [state, setState] = useState<State>({
    currentTime: format(today, 'h:mm a'),
    minutes: offset,
    seconds: today.getSeconds(),
    position: offset
  });

  const { currentTime, minutes, seconds, position } = state;

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds < 60) {
        setState({ ...state, seconds: +seconds + 1 });
      }
      if (seconds === 60) {
        if (minutes === total) {
          clearInterval(interval);
        } else {
          setState({
            ...state,
            currentTime: format(today, 'h:mm a'),
            minutes: +minutes + 1,
            seconds: 0,
            position: +position + 1
          });
        }
      }
    }, 1000);

    //!focused && clearInterval(interval);

    return () => {
      clearInterval(interval);
    }
  }, [seconds]);

  useEffect(() => {

    const offset = calculateTimeOffset(startTime);

    setState({
      ...state,
      currentTime: format(today, 'h:mm a'),
      seconds: today.getSeconds(),
      position: offset
    });

  }, [focused]);

  return <div className="calendar-timer" style={{ top: position }}>{currentTime}</div>
}