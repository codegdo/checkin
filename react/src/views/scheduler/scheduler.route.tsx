import React, { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';

//const Index = Template(lazy(() => import('./scheduler.index')));
//const Calendar = Template(lazy(() => import('./scheduler.calendar')));
const Calendar = Template(lazy(() => import('./calendar/calendar.page')));
const Appointment = Template(lazy(() => import('./appointment/appointment.page')));
const NotFound = Template(lazy(() => import('../notfound.component')));

export const SchedulerRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="calendars" />
    },
    {
      path: '/calendars',
      element: <Calendar page="calendars" />
    },
    {
      path: '/appointments',
      element: <Appointment page="appointments" />
    },
    {
      path: '*',
      element: <NotFound page="not-found" />
    },
  ]);

  return <>{routes}</>;
};