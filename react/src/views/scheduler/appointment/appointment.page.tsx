import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar } from '../../../components/calendar/calendar.component';
import { useFetch } from '../../../hooks';

const Appointment: React.FC = (): JSX.Element => {

  const [{ loading, result }, fetchAppointments] = useFetch();

  const [view, setView] = useState();
  const [events, setEvents] = useState();
  const [resources, setResources] = useState();
  const [invalid, setInvalid] = useState();
  const { calendarId } = useParams();

  // load data
  useEffect(() => {
    void fetchAppointments({
      url: `/api/scheduler/calendars/${calendarId}/appointments?employeeId=2`
    });
  }, []);

  useEffect(() => {
    if (loading === 'success') {
      console.log(result);
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