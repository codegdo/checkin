import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useAction } from '../../../hooks';
import { AppState } from '../../../store/reducers';
import { http } from '../../../services/http.service';

const Login: React.FC = (): JSX.Element => {
  const { loggedIn } = useSelector((state: AppState) => state.session);
  const { updateSession } = useAction();

  const handleSubmit = () => {
    updateSession({ loggedIn: true, user: null, orgId: null });
  };

  const handleFetch = async () => {
    try {
      const result = await http.get('http://localhost:5000/api/auth/login');
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  return loggedIn ? <Navigate to="/" /> : <div>
    LOGIN
    <button onClick={handleSubmit}>Login</button>
    <button onClick={handleFetch}>Fetch</button>
  </div>;
};

export default Login;