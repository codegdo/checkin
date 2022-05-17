import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../../hooks';

const Calendar: React.FC = (): JSX.Element => {

  const [{ status, response }, fetchCalendars] = useFetch('/api/scheduler/calendars');

  useEffect(() => {
    void fetchCalendars();
  }, []);

  useEffect(() => {
    if (status === 'success') {
      console.log(response);
    }
  }, [status]);

  if (status === 'pending') {
    return <div>loading...</div>
  }

  return <Link to="../appointments?calendarId=1">Calendar</Link>;
};

export default Calendar;