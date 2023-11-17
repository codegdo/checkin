import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { LoaderTemplate } from "@/components";

const Index = LoaderTemplate(lazy(() => import('./dashboard.index')));

function DashboardRoute() {

  const routes = useRoutes([
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
