import React, { useContext } from 'react';

import { CalendarContext } from './calendar.component';
import { CalendarTimeline } from './calendar.timeline';
import { getTimelines, getWeekDays } from '../../helpers';
import { CalendarTimer } from './calendar.timer';

export const CalendarWeek: React.FC = (): JSX.Element => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error('Require FORMFIELD Nested In FORMCONTEXT');
  }

  const { view, resources, currentDate = new Date() } = context;
  const { startTime = '0:00', endTime = '24:00' } = view || {};
  const weekDays = getWeekDays(currentDate);
  const timelines = getTimelines(startTime, endTime, 15);

  return <div className="calendar-week">
    <CalendarTimer startTime={startTime} endTime={endTime} />
    <div className="flex">
      <div className="flex-col flex-1">
        <CalendarTimeline timelines={timelines} />
      </div>
      {
        resources ?
          resources.map((resource: any) => {
            return <div key={resource.name} className="flex-col flex-1">
              <div className="flex">
                {
                  weekDays.map((_day, i) => {
                    return <div key={i} className="flex-col flex-1">
                      <CalendarTimeline timelines={timelines} label={false} />
                    </div>
                  })
                }
              </div>
            </div>;
          }) :
          weekDays.map((_day, i) => {
            return <div key={i} className="flex-col flex-1">
              <CalendarTimeline timelines={timelines} label={false} />
            </div>
          })
      }
    </div>
  </div>
}

/*
return <>
    {
      resources ?
        <div className="flex">
          <div className="flex-col flex-1"><CalendarTimeline timelines={timelines} /></div>
          {
            resources.map((resource: any) => {
              return <div key={resource.name} className="flex-col flex-1">
                <div className="flex">
                  {

                    weekDays.map((_day, i) => {
                      return <div key={i} className="flex-col flex-1">
                        <CalendarTimeline timelines={timelines} label={false} />
                      </div>
                    })

                  }
                </div>
              </div>;
            })
          }
        </div>
        :
        <div className="flex">
          <div className="flex-col flex-1"><CalendarTimeline timelines={timelines} /></div>
          {

            weekDays.map((_day, i) => {
              return <div key={i} className="flex-col flex-1">
                <CalendarTimeline timelines={timelines} label={false} />
              </div>
            })

          }
        </div>
    }
  </>
*/