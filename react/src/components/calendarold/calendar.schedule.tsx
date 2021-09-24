import React, { useContext } from 'react';
import { format, isToday } from "date-fns";

import { getTimelines, getWeekDays } from '../../helpers';
import { CalendarContext } from './calendar.component';

import { CalendarTimeline } from './calendar.timeline';
import { CalendarWeek } from './calendar.week';
import { CalendarTimer } from './calendar.timer';


export const CalendarSchedule: React.FC = (): JSX.Element => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error('Require FORMFIELD Nested In FORMCONTEXT');
  }

  const { view = {}, resources, currentDate = new Date() } = context;
  const { schedule } = view;
  const { type, startTime, endTime } = schedule;

  const timelines = getTimelines(startTime, endTime, 15);
  const weekDays = getWeekDays(currentDate);

  return (
    <div className="schedule">
      <div className="schedule-header">
        {
          type == 'day' &&
          <div>
            <span>{format(currentDate, "eeee")}</span>
            <span className={`${isToday(currentDate) ? '-selected' : ''}`}>{format(currentDate, "dd")}</span>
          </div>
        }

        <div className="flex">
          <div className="flex-col flex-1-1"></div>
          {
            type == 'day' &&
            resources.map((resource: any, i: number) => {
              return <div key={i} className="flex-col flex-1-1">{resource.name}</div>
            })
          }
          {
            type == 'week' &&
            resources.map((resource: any, i: number) => {
              return <div key={i} className="flex-col flex-1-1">
                {resource.name}
                <div className="flex">
                  <CalendarWeek pattern={"dayname"} />
                </div>
              </div>
            })
          }
        </div>
      </div>

      <div className="schedule-body">

        {
          isToday(currentDate) && <CalendarTimer startTime={startTime} endTime={endTime} />
        }

        <div className="flex">

          <div className="flex-col flex-1-1">
            <CalendarTimeline timelines={timelines} />
          </div>

          {
            type == 'day' &&
            resources.map((resource: any) => {
              return <div key={resource.name} className="flex-col flex-1-1">
                <CalendarTimeline timelines={timelines} label={false} />
              </div>;
            })
          }
          {
            type == 'week' &&
            resources.map((resource: any) => {
              return <div key={resource.name} className="flex-col flex-1-1">
                <div className="flex">
                  {
                    weekDays.map((_day, i) => {
                      return <div key={i} className="flex-col flex-1-1">
                        <CalendarTimeline timelines={timelines} label={false} />
                      </div>
                    })
                  }
                </div>
              </div>;
            })
          }

        </div>
      </div>
    </div>
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