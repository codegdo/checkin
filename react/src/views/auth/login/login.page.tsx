import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useAction } from '../../../hooks';
import { AppState } from '../../../store/reducers';

const Login: React.FC = (): JSX.Element => {
  const { loggedIn } = useSelector((state: AppState) => state.session);
  const { updateSession } = useAction();

  const handleSubmit = () => {
    updateSession({ loggedIn: true, user: null, orgId: null });
  };

  return loggedIn ? <Navigate to="/" /> : <div>
    LOGIN
    <button onClick={handleSubmit}>Login</button>
  </div>;
};

export default Login;