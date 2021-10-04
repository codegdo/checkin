import React, { useContext } from 'react';

import { CalendarContext } from './calendar.component';
import { CalendarTimeline } from './calendar.timeline';
import { getTimelines } from '../../helpers';
import { CalendarTimer } from './calendar.timer';

export const CalendarDay: React.FC = (): JSX.Element => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error('Require FORMFIELD Nested In FORMCONTEXT');
  }

  const { view, resources } = context;
  const { startTime = '0:00', endTime = '24:00' } = view || {};

  const timelines = getTimelines(startTime, endTime, 15);

  return <div className="calendar-day">
    <CalendarTimer startTime={startTime} endTime={endTime} />
    <div className="flex">
      <div className="flex-col flex-1">
        <CalendarTimeline timelines={timelines} />
      </div>
      {
        resources ? resources.map((resource: any) => {
          return <div key={resource.name} className="flex-col flex-1">
            <CalendarTimeline timelines={timelines} label={false} />
          </div>
        }) :
          <div className="flex-col flex-1">
            <CalendarTimeline timelines={timelines} label={false} />
          </div>
      }
    </div>
  </div>
}