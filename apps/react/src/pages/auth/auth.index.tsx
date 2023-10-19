import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Partial } from "@/components";

const Login = Partial(lazy(() => import('./login/login.page')));
const Signup = Partial(lazy(() => import('./signup/signup.page')));

function Index() {
  let routes = useRoutes([
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

  return <>{routes}</>
};

export default Index;