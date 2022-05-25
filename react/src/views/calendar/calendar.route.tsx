import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { Template, lazyLoad } from '../../components/template/template.component';

//const Index = Template(lazyLoad(() => import('./scheduler.index')));
//const Calendar = Template(lazyLoad(() => import('./scheduler.calendar')));
const Calendar = Template(lazyLoad(() => import('./calendar/calendar.page')));
const Appointment = Template(lazyLoad(() => import('./appointment/appointment.page')));
const NotFound = Template(lazyLoad(() => import('../../components/page/notfound.page')));

export const CalendarRoute: React.FC = (): JSX.Element => {
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