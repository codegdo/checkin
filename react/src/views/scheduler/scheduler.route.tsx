import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';

const Index = Template(lazy(() => import('./scheduler.index')));
const Calendar = Template(lazy(() => import('./scheduler.calendar')));
const NotFound = Template(lazy(() => import('../notfound.component')));

export const SchedulerRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Index page="scheduler" />
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