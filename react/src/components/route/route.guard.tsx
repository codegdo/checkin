import React from 'react';
import { useSelector } from 'react-redux';
import { RouteProps } from 'react-router';
import { Route, Routes, Navigate } from 'react-router-dom';

import { AppState } from '../../store/reducers';

export const RouteGuard: React.FC<RouteProps> = (props): JSX.Element => {
  const { session } = useSelector((state: AppState) => state);
  const { isLogin } = session;

  if (!isLogin) {
    return <Navigate to="/auth/login" />;
  }

  return <Routes><Route {...props} /></Routes>
};
