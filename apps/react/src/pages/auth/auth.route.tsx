import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { LoaderTemplate } from "@/components";

const Login = LoaderTemplate(lazy(() => import('./login/login.page')));
const Signup = LoaderTemplate(lazy(() => import('./signup/signup.page')));
const NotFound = LoaderTemplate(lazy(() => import('../notfound/notfound.page')));

function AuthRoute() {

  const routes = useRoutes([
    {
      path: '/',
      element: <Login module="auth" view="login" />
    },
    {
      path: '/login',
      element: <Login module="auth" view="login" />
    },
    {
      path: '/signup',
      element: <Signup module="auth" view="signup" />
    },
    {
      path: '*',
      element: <NotFound module="auth" view="notfound" />
    }
  ]);

  return routes;
}

export default AuthRoute;
