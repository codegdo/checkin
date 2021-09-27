import React, { useEffect, useMemo, useState } from 'react';
import { Calendar } from '../../../components/calendar/calendar.component';
import { ViewOptions } from '../../../components/calendar/calendar.type';
import { useFetch, useQuery } from '../../../hooks';

const Appointment: React.FC = (): JSX.Element => {

  const [{ loading, result }, fetchAppointments] = useFetch();

  const [view, setView] = useState<ViewOptions>();
  const [events, setEvents] = useState();
  const [resources, setResources] = useState();
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
        type: 'week',
        className: 'schedule',
        allDay: false,
        startTime: '',
        endTime: ''
      });
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