import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';
const NotFound = Template(lazy(() => import('../../components/page/notfound.page')));

const Index = Template(lazy(() => import('./home.index')));

export const HomeRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Index route="home" page="index" />
    },
    {
      path: '/welcome',
      element: <Index route="home" page="index" />
    },
    {
      path: '*',
      element: <NotFound page="not-found" />
    },
  ]);

  return <>{routes}</>;
};