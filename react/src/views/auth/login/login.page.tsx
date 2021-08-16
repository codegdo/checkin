import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useAction, useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';
import { http } from '../../../services/http.service';

import { Form } from '../../../components/form/form.component';

const Login: React.FC = (): JSX.Element => {
  const { loggedIn } = useSelector((state: AppState) => state.session);
  const { updateSession } = useAction();
  const [login, fetchLogin] = useFetch('/api/auth/login');
  const [logout, fetchLogout] = useFetch('/api/auth/logout');
  const [user, fetchUser] = useFetch('/api/admin/users/1');

  useEffect(() => {
    console.log(login);
  }, [login]);

  useEffect(() => {
    console.log(logout);
  }, [logout]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleSubmit = async () => {
    const result = await http.get('http://localhost:5000/api/auth/login');
    console.log(result);
    updateSession({ loggedIn: true, user: null, orgId: null });
  };

  const handleLogin = () => {
    const body = {
      username: "gdo",
      password: "123456"
    };
    fetchLogin({ body });
  };

  const handleLogout = () => {
    fetchLogout();
  };

  const handleFetch = () => {
    fetchUser();
  }

  return loggedIn ? <Navigate to="/" /> : <div>
    LOGIN
    <button onClick={handleLogin}>Login</button>
    <button onClick={handleLogout}>Logout</button>
    <button onClick={handleFetch}>Fetch</button>

    <Form>
      <Form.Button>Click Me</Form.Button>
    </Form>

  </div>;
};

export default Login;