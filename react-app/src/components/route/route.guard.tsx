import React from 'react';
import { RouteProps } from 'react-router';
import { Route, Routes } from 'react-router-dom';

export const RouteGuard: React.FC<RouteProps> = (props): JSX.Element => {
  return <Routes><Route {...props} /></Routes>
};
