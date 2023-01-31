import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

const Index: FC = (): JSX.Element => {
  return <Outlet />
};

export default Index;