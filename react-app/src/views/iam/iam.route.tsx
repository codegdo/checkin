import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import { Template } from "../../components";

const Index = Template(lazy(() => import('./iam.index')));
const UserList = Template(lazy(() => import('./user/user.list')));

export function IamRoute() {

  let routes = useRoutes([
    {
      path: '/',
      element: <Index route="iam" page="index" />
    },
    {
      path: '/users',
      element: <UserList route="iam" page="users" />
    },
    {
      path: '*',
      element: <>not found iam</>
    }
  ]);

  return routes
}
