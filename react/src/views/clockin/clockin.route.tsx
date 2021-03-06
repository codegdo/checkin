import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useRoutes } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../app.config';

import { Template, lazyLoad } from '../../components/template/template.component';
import { useLogout } from '../../hooks';
import { cookieStore, sessionStore } from '../../services';
import { AppState } from '../../store/reducers';

const Index = Template(lazyLoad(() => import('./clockin.index')));
const Location = Template(lazyLoad(() => import('./clockin.location')));
const NotFound = Template(lazyLoad(() => import('../../components/page/notfound.page')));

export const ClockinRoute: React.FC = (): JSX.Element => {
  const { user } = useSelector((state: AppState) => state.session);
  const navigate = useNavigate();
  const logout = useLogout();
  //const auth = useAuth();

  useEffect(() => {

    if (user) {

      // if (accessToken) {
      //   sessionStore.setItem(ACCESS_TOKEN, accessToken);
      //   cookieStore.setCookie(ACCESS_TOKEN, accessToken, 1);
      // }

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