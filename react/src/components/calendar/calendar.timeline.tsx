import React from 'react';

import { format, getMinutes } from "date-fns";
import { CalendarTimelineProps } from './calendar.type';

export const CalendarTimeline: React.FC<CalendarTimelineProps> = ({ timelines = [], label = true }): JSX.Element => {
  return label ? <>
    {
      timelines.map((timeline: any, i: number) => {

        return (getMinutes(timeline) == 0) ? <div key={i} className="calendar-cell">
          {
            format(timeline, 'h a')
          }
        </div> : <div key={i} className="calendar-cell"></div>
      })
    }
  </> : <>
    {
      timelines.map((_timeline: any, i: number) => {
        return <div key={i} className="calendar-cell"></div>
      })
    }
  </>
}