import React, { useContext } from 'react';
import { format, getMinutes, setDate } from "date-fns";
import { getIntervalTimes } from '../../helpers';
import { CalendarContext } from './calendar.component';

export const CalendarSchedule: React.FC = (): JSX.Element => {


  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error('Require FORMFIELD Nested In FORMCONTEXT');
  }

  const { view = {}, resources } = context;
  const { schedule } = view;

  const timeIntervals = getIntervalTimes(schedule.startTime, schedule.endTime, 15);

  return (
    <>

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

    </>
  )
}

/*
<div className="calendar-row">
      <div className="calendar-cell">
        <div>All</div>
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
          return <div className="calendar-cell">
            <div>{resource.name}</div>
            {
              timeIntervals.map((interval: any, i: number) => {

                return (getMinutes(interval) == 0) && <div key={i}>.</div>
              })
            }
          </div>
        })
      }

    </div>
*/