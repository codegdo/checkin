import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { Partial } from "@/components";

const Policy = Partial(lazy(() => import('./policy.page')));
const PolicyForm = Partial(lazy(() => import('./policy.form')));

const PolicyGenerator = Partial(lazy(() => import('./generator/generator.page')));
const PolicySimulator = Partial(lazy(() => import('./simulator/simulator.page')));

function PolicyRoute() {

  const routes = useRoutes([
    {
      path: '/generator',
      element: <PolicyGenerator module="iam" view="policies" />
    },
    {
      path: '/simulator',
      element: <PolicySimulator module="iam" view="policies" />
    },
    {
      path: '/:id',
      element: <PolicyForm module="iam" view="policies" />
    },
    {
      path: '/',
      element: <Policy module="iam" view="policies" />
    },
    {
      path: '*',
      element: <div>not found home</div>
    }
  ]);

  return routes;
}

export default PolicyRoute;
