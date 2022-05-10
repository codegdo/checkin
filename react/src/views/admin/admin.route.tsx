import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { NotFound } from '../../components/page';
import { Template } from '../../components/template/template.component';


const Index = Template(lazy(() => import('./admin.index')));

export const AdminRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Index route="admin" page="index" />
    },
    {
      path: '*',
      element: <NotFound page="not-found" />
    },
  ]);

  return <>{routes}</>;
};