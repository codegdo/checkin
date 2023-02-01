import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import { Template } from "../../components";

const Index = Template(lazy(() => import('./iam.index')));
const User = Template(lazy(() => import('./user/user.page')));

export const IamRoute = () => {

  let routes = useRoutes([
    {
      path: '/',
      element: <Index route="iam" page="index" />
    },
    {
      path: '/users',
      element: <User route="iam" page="users" />
    },
    {
      path: '*',
      element: <>not found iam</>
    }
  ]);

  return routes
}
