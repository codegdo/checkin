import React, { useContext } from 'react';

import { CalendarContext } from './calendar.component';
import { CalendarTimeline } from './calendar.timeline';
import { getTimelines } from '../../helpers';

export const CalendarDay: React.FC = (): JSX.Element => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error('Require FORMFIELD Nested In FORMCONTEXT');
  }

  const { view, resources } = context;
  const { startTime = '8:00', endTime = '20:00' } = view || {};

  const timelines = getTimelines(startTime, endTime, 15);

  return <>
    {
      resources ?
        <div className="flex">
          {
            resources.map((resource: any) => {
              return <div key={resource.name} className="flex-col flex-1">
                <CalendarTimeline timelines={timelines} label={false} />
              </div>
            })
          }
        </div>
        :
        <div className="flex">
          <div className="flex-col flex-1">
            <CalendarTimeline timelines={timelines} label={false} />
          </div>
        </div>
    }
  </>
}