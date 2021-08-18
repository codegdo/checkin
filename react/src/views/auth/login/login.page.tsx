import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useAction, useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';

import { Form, Block, Field, Button, FormData } from '../../../components/form';

const Login: React.FC = (): JSX.Element => {
  const { loggedIn } = useSelector((state: AppState) => state.session);
  const { updateSession } = useAction();
  const [login, fetchLogin] = useFetch('/api/auth/login');
  const [form, setForm] = useState<FormData>();

  // load form
  useEffect(() => {
    void (async () => {
      const json = (await import('./login.json')).default;
      setForm(json);
    })();
  }, [])

  useEffect(() => {
    if (login.status === 'success') {
      const { user } = login?.result?.data;
      updateSession({ loggedIn: true, user, orgId: null });
    }
  }, [login]);

  const handleSubmit = (values: Record<string, unknown>) => {
    console.log(values);
    fetchLogin({ body: values });
  };

  return loggedIn ? <Navigate to="/" /> : (
    form ? <div>
      LOGIN
      <Form onSubmit={handleSubmit}>
        <Block type="section">
          <Field field={{
            label: "Username",
            name: "username",
            type: "text"
          }}
          />
          <Field
            label="Password"
            name="password"
            type="password"
          />
          <Button
            label="Login"
            name="submit"
            type="button"
          />
        </Block>
      </Form>
      <Form form={form} onSubmit={handleSubmit}></Form>
    </div> : <div>loadding...</div>
  );
};

export default Login;