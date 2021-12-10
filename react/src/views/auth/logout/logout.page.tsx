import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useLogout } from '../../../hooks';
import { AppState } from '../../../store/reducers';

const Logout: React.FC = (): JSX.Element => {
  const { user } = useSelector((state: AppState) => state.session);
  const logout = useLogout();

  useEffect(() => {
    logout();
  }, []);

  return user ? <div>logout...</div> : <Navigate to="/" />;
};

export default Logout;