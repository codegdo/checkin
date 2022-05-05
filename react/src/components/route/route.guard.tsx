import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouteProps, useNavigate } from 'react-router';
import { Route, Routes } from 'react-router-dom';

import { AppState } from '../../store/reducers';

export const RouteGuard: React.FC<RouteProps> = (props): JSX.Element => {
  const { user } = useSelector((state: AppState) => state.session);
  const navigate = useNavigate();

  useEffect(() => {
    !user && navigate('/auth/login');
  }, [user]);

  return <Routes><Route {...props} /></Routes>
};
