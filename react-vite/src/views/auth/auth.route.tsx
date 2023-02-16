import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { Partial, Template } from "../../components";

const Index = Template(lazy(() => import('./auth.index')));
const Login = Partial(lazy(() => import('./login/login.page')));
const Logout = Partial(lazy(() => import('./logout/logout.page')));
const Verify = Partial(lazy(() => import('./verify/verify.page')));

export const AuthRoute = () => {

  let routes = useRoutes([
    {
      element: <Index route="auth" page="index" />,
      children: [
        {
          path: '/',
          element: <Login route="auth" page="login" />
        },
        {
          path: '/login',
          element: <Login route="auth" page="login" />
        },
        {
          path: '/logout',
          element: <Logout route="auth" page="logout" />
        },
        {
          path: '/verify',
          element: <Verify route="auth" page="verify" />
        }
      ]
    },
    {
      path: '*',
      element: <>not found auth</>
    }
  ]);

  return routes
}
