import React from 'react';
import { Navigate } from 'react-router';

const Logout: React.FC = (props): JSX.Element => {
  return <Navigate to='../login' />
}

export default Logout;