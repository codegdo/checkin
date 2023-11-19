import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { LoaderPartial } from "@/components";

const Client = LoaderPartial(lazy(() => import('./client.page')));

function ClientRoute() {

  const routes = useRoutes([
    {
      path: '/',
      element: <Client module="admin" view="clients" />
    },
    {
      path: '*',
      element: <div>not found home</div>
    }
  ]);

  return routes;
}

export default ClientRoute;
