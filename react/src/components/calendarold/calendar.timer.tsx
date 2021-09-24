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

export const CalendarTimer: React.FC<CalendarTimerProps> = ({ startTime = '0:00', endTime = '0:00' }): JSX.Element | null => {

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

  return <div className="schedule-timer" style={{ top: position }}>{currentTime}</div>
}

/*
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
          setCurrentTime(format(today, 'h:mm a'));
        }
      }
    }, 1000);

    //!focused && clearInterval(interval);

    return () => {
      clearInterval(interval);
    }
  }, [seconds]);

  useEffect(() => {
    console.log('STATE', state);
    const offset = calculateTimeOffset(startTime);

    setSeconds(today.getSeconds());
    setPosition(offset * 2);
    setCurrentTime(format(today, 'h:mm a'));
  }, [focused]);
  */