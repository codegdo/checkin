import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { LoaderTemplate } from "@/components";

const Index = LoaderTemplate(lazy(() => import('./dashboard.index')));
const Console = LoaderTemplate(lazy(() => import('./system/console.dashboard')));
const Overview = LoaderTemplate(lazy(() => import('./internal/overview.dashboard')));
const Welcome = LoaderTemplate(lazy(() => import('./external/welcome.dashboard')));

function DashboardRoute() {

  const routes = useRoutes([
    {
      path: '/console',
      element: <Console module="dashboard" view="console" />
    },
    {
      path: '/overview',
      element: <Overview module="dashboard" view="overview" />
    },
    {
      path: '/welcome',
      element: <Welcome module="dashboard" view="welcome" />
    },
    {
      path: '/',
      element: <Index module="dashboard" view="index" />
    },
    {
      path: '*',
      element: <div>not found home</div>
    }
  ]);

  return routes;
}

export default DashboardRoute;
