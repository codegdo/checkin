import React from 'react';
import { useRoutes } from 'react-router-dom';
import { NotFound } from '../../components/page';
import { Template, lazyLoad } from '../../components/template/template.component';

const Index = Template(lazyLoad(() => import('./setup.index')));
const UserList = Template(lazyLoad(() => import('./user/user.list')));
const UserForm = Template(lazyLoad(() => import('./user/user.form')));
const ClientList = Template(lazyLoad(() => import('./client/client.list')));
const GroupList = Template(lazyLoad(() => import('./group/group.list')));
const GroupForm = Template(lazyLoad(() => import('./group/group.form')));
const PolicyList = Template(lazyLoad(() => import('./policy/policy.list')));
const PolicyForm = Template(lazyLoad(() => import('./policy/policy.form')));

export const SetupRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Index route="setup" page="index" />
    },
    {
      path: 'users/:id',
      element: <UserForm route="setup" page="users" />
    },
    {
      path: 'users',
      element: <UserList route="setup" page="users" />
    },
    {
      path: 'clients',
      element: <ClientList route="setup" page="clients" />
    },
    {
      path: 'groups/:id',
      element: <GroupForm route="setup" page="groups" />
    },
    {
      path: 'groups',
      element: <GroupList route="setup" page="groups" />
    },
    {
      path: 'policies/:id',
      element: <PolicyForm route="setup" page="policies" />
    },
    {
      path: 'policies',
      element: <PolicyList route="setup" page="policies" />
    },
    {
      path: '*',
      element: <NotFound route="setup" page="notfound" />
    },
  ]);

  return <>{routes}</>;
};