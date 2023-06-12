import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import PartialLoader from "../../components/loader/partial.loader";

const Login = PartialLoader(lazy(() => import('./login/login.page')));
const Signup = PartialLoader(lazy(() => import('./signup/signup.page')));

function Index() {
  let routes = useRoutes([
    {
      path: '/',
      element: <Login route="auth" page="login" />
    },
    {
      path: '/login',
      element: <Login route="auth" page="login" />
    },
    {
      path: '/signup',
      element: <Signup route="auth" page="signup" />
    },
    {
      path: '*',
      element: <div>not found auth.index</div>
    }
  ]);

  return <>{routes}</>
};

export default Index;