import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';

const Home = Template(lazy(() => import('./home.index')));

export const HomeRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Home page="home" />
    },
  ]);

  return <>{routes}</>;
};