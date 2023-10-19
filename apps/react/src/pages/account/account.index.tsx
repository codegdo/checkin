import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import {Partial} from "@/components";

const Profile = Partial(lazy(() => import('./profile/profile.page')));

function Index() {
  let routes = useRoutes([
    {
      path: '/profile',
      element: <Profile module="account" view="profile" />
    },
    {
      path: '*',
      element: <div>not found auth</div>
    }
  ]);

  return <>{routes}</>
};

export default Index;