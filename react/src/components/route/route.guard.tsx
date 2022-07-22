import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouteProps, useLocation, useNavigate } from 'react-router';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from '../../hooks';

import { AppState } from '../../store/reducers';

export const RouteGuard: React.FC<RouteProps> = (props): JSX.Element => {
  const { user } = useSelector((state: AppState) => state.session);
  const { auth } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // when session timeout - pass back previous location to login page
    !user && navigate('/auth/login', { state });
  }, [user]);

  return <Routes><Route {...props} /></Routes>
};
