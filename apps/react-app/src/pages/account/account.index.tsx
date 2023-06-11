import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import PartialLoader from "../../components/loader/partial.loader";

const Profile = PartialLoader(lazy(() => import('./profile/profile.page')));

function Index() {
  let routes = useRoutes([
    {
      path: '/profile',
      element: <Profile route="account" page="profile" />
    },
    {
      path: '*',
      element: <div>not found auth</div>
    }
  ]);

  return <>{routes}</>
};

export default Index;