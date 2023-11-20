import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { LoaderTemplate } from "@/components";

const Login = LoaderTemplate(lazy(() => import('./login/login.page')));
const Signup = LoaderTemplate(lazy(() => import('./signup/signup.page')));

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
      element: <div>not found auth.index</div>
    }
  ]);

  return routes;
}

export default AuthRoute;
