import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import TemplateLoader from "../../components/loader/template.loader";

const Index = TemplateLoader(lazy(() => import('./home.index')));
const Dashboard = TemplateLoader(lazy(() => import('./dashboard/dashboard.page')));

function HomeRoute() {

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <Dashboard route="dahsboard" page="dashboard" />
    },
    {
      path: '/',
      element: <Index route="home" page="index" />
    },
    {
      path: '*',
      element: <div>not found home</div>
    }
  ]);

  return routes;
}

export default HomeRoute;
