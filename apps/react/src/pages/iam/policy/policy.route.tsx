import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { LoaderPartial } from "@/components";

const Policy = LoaderPartial(lazy(() => import('./policy.list')));
const PolicyForm = LoaderPartial(lazy(() => import('./policy.form')));

const PolicyGenerator = LoaderPartial(lazy(() => import('./policy-generator/policy-generator.page')));
const PolicySimulator = LoaderPartial(lazy(() => import('./policy-simulator/policy-simulator.page')));

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
