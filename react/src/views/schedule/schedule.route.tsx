import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';

const Index = Template(lazy(() => import('./schedule.index')));
const Calendar = Template(lazy(() => import('./schedule.calendar')));
const NotFound = Template(lazy(() => import('../notfound.component')));

export const ScheduleRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Index page="schedule" />
    },
    {
      path: ':calendarId*',
      element: <Calendar page="calendar" />
    },
    {
      path: '*',
      element: <NotFound page="not-found" />
    },
  ]);

  return <>{routes}</>;
};