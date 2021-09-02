import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

import { Template } from '../../components/template/template.component';

const Index = Template(lazy(() => import('./checkin.index')));
const Location = Template(lazy(() => import('./checkin.location')));
const NotFound = Template(lazy(() => import('../notfound.component')));

export const CheckinRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Index page="checkin" />
    },
    {
      path: ':locationId*',
      element: <Location page="location" />
    },
    {
      path: '*',
      element: <NotFound page="not-found" />
    },
  ]);

  return <>{routes}</>;
};