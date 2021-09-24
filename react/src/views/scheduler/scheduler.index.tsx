import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks';

const SchedulerIndex: React.FC = (): JSX.Element => {

  const [{ loading, result }, fetchCalendars] = useFetch('/api/scheduler');

  useEffect(() => {
    //void (fetchCalendars())
  }, [])

  return <Link to="1">Calendar</Link>;
};

export default SchedulerIndex;