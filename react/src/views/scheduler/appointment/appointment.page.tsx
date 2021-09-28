import React, { useEffect, useState } from 'react';
import { Calendar } from '../../../components/calendar/calendar.component';
import { ViewOptions } from '../../../components/calendar/calendar.type';
import { useFetch, useQuery } from '../../../hooks';

const defaultView: ViewOptions = {
  type: 'week',
  className: 'calendar',
  allDay: false,
  startTime: '',
  endTime: ''
}

const Appointment: React.FC = (): JSX.Element => {

  const [{ loading, result }, fetchAppointments] = useFetch();

  const [view, setView] = useState(defaultView);
  const [events, setEvents] = useState();
  const [resources, setResources] = useState<any>();
  const [invalid, setInvalid] = useState();
  const { calendarId } = useQuery();

  // load data
  useEffect(() => {
    void fetchAppointments({
      url: `/api/scheduler/appointments?calendarId=${String(calendarId)}`
    });
  }, []);

  useEffect(() => {
    if (loading === 'success') {
      console.log(result);

      setView({
        ...view,
        startTime: '',
        endTime: ''
      });

      setResources([{
        id: 1,
        name: 'Thanh',
        color: '#f7c4b4'
      }, {
        id: 2,
        name: 'Mana',
        color: '#c6f1c9'
      }]);
    }
  }, [loading]);

  if (loading === 'pending') {
    return <div>loading...</div>
  }

  return (
    <div>
      <Calendar
        loading={loading}
        view={view}
        events={events}
        resources={resources}
        invalid={invalid}
        setView={setView}
        setEvents={setEvents}
        setResources={setResources}
        setInvalid={setInvalid}
      />
    </div>
  )
}

export default Appointment;