import React from 'react';
import { Navigate } from 'react-router';

const HomeRedirect: React.FC = (): JSX.Element => {
  return <Navigate to="/" />;
};

export default HomeRedirect;