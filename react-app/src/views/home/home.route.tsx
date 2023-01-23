import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

import { Template } from '../../components/template/template.component';

const Index = Template(lazy(() => import('./home.index')));

export const HomeRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Index route="home" page="index" />
    }
  ]);

  return <>{routes}</>;
};