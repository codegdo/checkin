import React from 'react';
import { Navigate } from 'react-router';

const AdminRedirect: React.FC = (): JSX.Element => {
  return <Navigate to="/admin" />;
};

export default AdminRedirect;