import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import { Template } from "../../components";

const Index = Template(lazy(() => import('./home.index')));

export const HomeRoute = () => {

  let routes = useRoutes([
    {
      element: <Index route="home" page="index" />,
      path: '/'
    }
  ]);

  return routes
}