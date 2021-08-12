import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useAction } from '../../../hooks';
import { AppState } from '../../../store/reducers';
import { http } from '../../../services/http.service';

const Login: React.FC = (): JSX.Element => {
  const { loggedIn } = useSelector((state: AppState) => state.session);
  const { updateSession } = useAction();

  const handleSubmit = async () => {
    const result = await http.get('http://localhost:5000/api/auth/login');
    console.log(result);
    updateSession({ loggedIn: true, user: null, orgId: null });
  };

  const handleLogin = async () => {
    const result = await http.post('http://localhost:5000/api/auth/login', {
      body: {
        username: "gdo",
        password: "123456"
      }
    });
    console.log(result);
  };

  const handleLogout = async () => {
    const result = await http.get('http://localhost:5000/api/auth/logout');
    console.log(result);
  };

  const handleFetch = async () => {
    const result = await http.get('http://localhost:5000/api/admin/users/1');
    console.log(result);
  }

  return loggedIn ? <Navigate to="/" /> : <div>
    LOGIN
    <button onClick={handleLogin}>Login</button>
    <button onClick={handleLogout}>Logout</button>
    <button onClick={handleFetch}>Fetch</button>
  </div>;
};

export default Login;