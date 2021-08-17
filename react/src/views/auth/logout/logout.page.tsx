import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useAction } from '../../../hooks';
import { AppState } from '../../../store/reducers';

const Logout: React.FC = (): JSX.Element => {
  const { loggedIn } = useSelector((state: AppState) => state.session);
  const { deleteSession } = useAction();

  useEffect(() => {
    loggedIn && deleteSession();
  }, []);

  return loggedIn ? <div>logout</div> : <Navigate to="/" />;
};

export default Logout;