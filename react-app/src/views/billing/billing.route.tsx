import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import { Template } from "../../components";

const Index = Template(lazy(() => import('./billing.index')));
const SubscriptionList = Template(lazy(() => import('./subscriptions/subscription.list')));

export function SubscriptionRoute() {

  let routes = useRoutes([
    {
      path: '/',
      element: <Index route="billing" page="index" />
    },
    {
      path: '/subscriptions',
      element: <SubscriptionList route="billing" page="subscriptions" />
    },
    {
      path: '*',
      element: <>not found iam</>
    }
  ]);

  return routes
}
