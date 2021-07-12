import React from 'react';
import { RouteProps } from 'react-router';
import { Route, Navigate } from 'react-router-dom';

export const RouteGuard: React.FC<RouteProps> = (props): JSX.Element => {
  return true ? <Route {...props} /> : <Navigate to="/auth/login" />
};
