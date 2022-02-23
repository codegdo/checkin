import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { NotFound } from '../../components/page';
import { Template } from '../../components/template/template.component';


const Index = Template(lazy(() => import('./config.index')));

export const ConfigRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Index route="config" page="index" />
    },
    {
      path: '*',
      element: <NotFound page="not-found" />
    },
  ]);

  return <>{routes}</>;
};