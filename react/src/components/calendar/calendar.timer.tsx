import React, { useEffect, useReducer } from 'react';
import { format } from "date-fns";

import { CalendarTimerProps } from './calendar.type';
import { useWindowFocus } from '../../hooks';
import { calculateTimeInterval, calculateTimeOffset } from '../../helpers';

type Action = {
  type: 'COUNTING' | 'UPDATING';
  payload?: any
};

type State = {
  currentTime: string;
  minutes: number;
  seconds: number;
  position: number;
}

const init = (initialState: State) => initialState;

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'COUNTING':
      return { ...state, ...action.payload };
    case 'UPDATING':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const CalendarTimer: React.FC<CalendarTimerProps> = ({ startTime = '0:00', endTime = '0:00' }): JSX.Element => {

  const today = new Date();
  const offset = calculateTimeOffset(startTime);
  const total = calculateTimeInterval(startTime, endTime);

  const initialState = {
    currentTime: format(today, 'h:mm a'),
    minutes: offset,
    seconds: today.getSeconds(),
    position: offset * 2
  }

  const [{ currentTime, minutes, seconds, position }, dispatch] = useReducer(reducer, initialState, init);

  const focused = useWindowFocus();

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds < 60) {
        dispatch({
          type: 'COUNTING',
          payload: { seconds: +seconds + 1 }
        });
      }
      if (seconds === 60) {
        if (minutes === total) {
          clearInterval(interval);
        } else {
          dispatch({
            type: 'UPDATING',
            payload: {
              currentTime: format(today, 'h:mm a'),
              minutes: +minutes + 1,
              seconds: 0,
              position: +position + 2
            }
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

    dispatch({
      type: 'UPDATING',
      payload: {
        currentTime: format(today, 'h:mm a'),
        seconds: today.getSeconds(),
        position: offset * 2
      }
    });

  }, [focused]);

  return <div className="schedule-timer" style={{ top: position }}>{currentTime}{seconds}</div>
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