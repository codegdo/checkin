import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import { Template } from "../../components";

const Index = Template(lazy(() => import('./home.index')));

export function HomeRoute() {

  let routes = useRoutes([
    {
      path: '/',
      element: <Index route="home" page="index" />
    },
    {
      path: '*',
      element: <>not found home</>
    }
  ]);

  return routes
}