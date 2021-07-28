import React from 'react';
import { useSelector } from 'react-redux';
import { RouteProps } from 'react-router';
import { Route, Navigate } from 'react-router-dom';

import { AppState } from '../../store/reducers';

export const RouteGuard: React.FC<RouteProps> = (props): JSX.Element => {
  const { loggedIn } = useSelector((state: AppState) => state.session);

  return loggedIn ? <Route {...props} /> : <Navigate to="/auth/login" />
};
