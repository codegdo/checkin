import React, { useEffect, useState } from 'react';
import { Calendar } from '../../../components/calendar/calendar.component';
import { useFetch } from '../../../hooks';

const Appointment: React.FC = (): JSX.Element => {

  const [{ loading, result }, fetchAppointment] = useFetch('/api/auth/login');

  const [view, setView] = useState();
  const [events, setEvents] = useState();
  const [resources, setResources] = useState();
  const [invalid, setInvalid] = useState();


  // load data
  useEffect(() => {
    //void (async () => {})();
  }, []);

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