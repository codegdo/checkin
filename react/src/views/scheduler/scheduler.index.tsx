import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks';

const SchedulerIndex: React.FC = (): JSX.Element => {

  const [{ loading, result }, fetchCalendars] = useFetch('/api/scheduler/calendars');

  useEffect(() => {
    void fetchCalendars();
  }, []);

  useEffect(() => {
    if (loading === 'success') {
      console.log(result);
    }
  }, [loading]);

  if (loading === 'pending') {
    return <div>loading...</div>
  }

  return <Link to="1">Calendar</Link>;
};

export default SchedulerIndex;