import { lazy } from "react";
import { useRoutes } from "react-router-dom";

//import Index from "./auth.index";
import TemplateLoader from "../../components/loader/template.loader";
//import PartialLoader from "../../components/loader/partial.loader";

const Index = TemplateLoader(lazy(() => import('./auth.index')));
//const Login = PartialLoader(lazy(() => import('./login/login.page')));
// const Logout = Partial(lazy(() => import('./logout/logout.page')));
// const Signup = Partial(lazy(() => import('./signup/signup.page')));
// const Verify = Partial(lazy(() => import('./verify/verify.page')));
// const Setup = Partial(lazy(() => import('./setup/setup.page')));

function AuthRoute() {

  let routes = useRoutes([
    {
      path: '/*',
      element: <Index route="auth" page="index" />
    }
  ]);

  return <>{routes}</>
}

export default AuthRoute;
