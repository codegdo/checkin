import React, { useContext } from 'react';
import { format } from "date-fns";

import { getTimelines, getWeekDays } from '../../helpers';
import { CalendarContext } from './calendar.component';
import { CalendarHeader } from './calendar.header';
import { CalendarTimeline } from './calendar.timeline';
import { CalendarWeek } from './calendar.week';

export const CalendarSchedule: React.FC = (): JSX.Element => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error('Require FORMFIELD Nested In FORMCONTEXT');
  }

  const { view = {}, resources, currentDate } = context;
  const { schedule } = view;
  const { type, startTime, endTime } = schedule;

  const timelines = getTimelines(startTime, endTime, 15);
  const weekDays = getWeekDays(currentDate);

  return (
    <>
      {
        type == 'day' && <div>{format(currentDate, "dd MMMM yyyy")}</div>
      }
      <div className="calendar-row">
        <div className="calendar-column"><div className="calendar-cell">.</div></div>
        {
          type == 'day' &&
          resources.map((resource: any, i: number) => {
            return <div key={i} className="calendar-column">{resource.name}</div>
          })
        }
        {
          type == 'week' &&
          resources.map((resource: any, i: number) => {
            return <div key={i} className="calendar-column">
              {resource.name}
              <div className="calendar-row">
                <CalendarWeek pattern={"dayname"} />
              </div>
            </div>
          })
        }
      </div>

      <div className="calendar-row">

        <div className="calendar-column">
          <CalendarTimeline timelines={timelines} />
        </div>

        {
          type == 'day' &&
          resources.map((resource: any) => {
            return <div key={resource.name} className="calendar-column">
              <CalendarTimeline timelines={timelines} label={false} />
            </div>;
          })
        }
        {
          type == 'week' &&
          resources.map((resource: any) => {
            return <div key={resource.name} className="calendar-column">
              <div className="calendar-row">
                {
                  weekDays.map((_day, i) => {
                    return <div key={i} className="calendar-column">
                      <CalendarTimeline timelines={timelines} label={false} />
                    </div>
                  })
                }
              </div>
            </div>;
          })
        }

      </div>

    </>
  )
}

/*
<div className="calendar-row">
      <div className="calendar-column">
        {
          timeIntervals.map((interval: any, i: number) => {

            return (getMinutes(interval) == 0) && <div key={i}>
              {
                format(interval, 'h a')
              }
            </div>
          })
        }
      </div>
      {
        resources.map((resource: any) => {
          return <div className="calendar-column">
            {
              timeIntervals.map((interval: any, i: number) => {

                return (getMinutes(interval) == 0) && <div key={i} className="calendar-cell">.</div>
              })
            }
          </div>
        })
      }

    </div>


    <div className="schedule-row">
        <div className="schedule-cell">.</div>
        {
          resources.map((resource: any) => {
            return <div key={resource.id} className="schedule-cell">{resource.name}</div>
          })
        }
      </div>

      {
        timeIntervals.map((interval: any, i: number) => {

          return (getMinutes(interval) == 0) && <div key={i} className="schedule-row">
            <div className="schedule-cell">{format(interval, 'h a')}</div>
            {
              resources.map((resource: any) => {
                return <div key={resource.id} className="schedule-cell">.</div>
              })
            }
          </div>
        })
      }





case 'week':
                return <div key={resource.name} className="calendar-column">
                  <div className="calendar-row">
                    <div className="calendar-column">
                      {
                        timeIntervals.map((_interval: any, i: number) => {
                          return <div key={i} className="calendar-cell">.</div>
                        })
                      }
                    </div>
                    <div className="calendar-column">
                      {
                        timeIntervals.map((_interval: any, i: number) => {
                          return <div key={i} className="calendar-cell">.</div>
                        })
                      }
                    </div>
                    <div className="calendar-column">
                      {
                        timeIntervals.map((_interval: any, i: number) => {
                          return <div key={i} className="calendar-cell">.</div>
                        })
                      }
                    </div>
                    <div className="calendar-column">
                      {
                        timeIntervals.map((_interval: any, i: number) => {
                          return <div key={i} className="calendar-cell">.</div>
                        })
                      }
                    </div>
                    <div className="calendar-column">
                      {
                        timeIntervals.map((_interval: any, i: number) => {
                          return <div key={i} className="calendar-cell">.</div>
                        })
                      }
                    </div>
                    <div className="calendar-column">
                      {
                        timeIntervals.map((_interval: any, i: number) => {
                          return <div key={i} className="calendar-cell">.</div>
                        })
                      }
                    </div>
                    <div className="calendar-column">
                      {
                        timeIntervals.map((_interval: any, i: number) => {
                          return <div key={i} className="calendar-cell">.</div>
                        })
                      }
                    </div>

                  </div>

                </div>;
*/