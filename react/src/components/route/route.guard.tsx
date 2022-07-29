import React, { useEffect } from 'react';
import { RouteProps, useLocation, useNavigate } from 'react-router';
import { Route, Routes } from 'react-router-dom';

import { useAuth } from '../../hooks';

export const RouteGuard: React.FC<RouteProps> = (props): JSX.Element => {

  const { auth } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // when session timeout - pass back previous location to login page
    !auth && navigate('/auth/login', { state });
  }, [auth]);

  return <Routes><Route {...props} /></Routes>
};
