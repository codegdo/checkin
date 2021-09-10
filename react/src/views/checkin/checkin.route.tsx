import React, { lazy, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useRoutes } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../app.config';

import { Template } from '../../components/template/template.component';
import { useAction, useAuth, useFetch, useLogout } from '../../hooks';
import { cookieStore, sessionStore } from '../../services';
import { AppState } from '../../store/reducers';

const Index = Template(lazy(() => import('./checkin.index')));
const Location = Template(lazy(() => import('./checkin.location')));
const NotFound = Template(lazy(() => import('../notfound.component')));

export const CheckinRoute: React.FC = (): JSX.Element => {
  const { loggedIn, accessToken } = useSelector((state: AppState) => state.session);
  const navigate = useNavigate();
  const logout = useLogout();
  //const auth = useAuth();

  useEffect(() => {

    if (loggedIn) {

      if (accessToken) {
        sessionStore.setItem(ACCESS_TOKEN, accessToken);
        cookieStore.setCookie(ACCESS_TOKEN, accessToken, 1);
      }

      logout();
    }

    if (!sessionStore.getItem(ACCESS_TOKEN)) {
      navigate('/auth/login');
    }

    console.log('ACCESS TOKEN');

  }, []);

  const routes = useRoutes([
    {
      path: '/',
      element: <Index page="checkin" />
    },
    {
      path: ':locationId*',
      element: <Location page="location" />
    },
    {
      path: '*',
      element: <NotFound page="not-found" />
    },
  ]);

  return <>{routes}</>;
};