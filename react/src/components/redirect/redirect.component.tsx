import React from 'react';
import { Navigate } from 'react-router';

interface RedirectProps {
  path: string;
}
const Redirect: React.FC<RedirectProps> = ({ path }): JSX.Element => {
  return <Navigate to={`${path}`} />;
};

export default Redirect;