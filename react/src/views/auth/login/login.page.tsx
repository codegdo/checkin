import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useAction, useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';

import { Form, FormData } from '../../../components/form';


const Login: React.FC = (): JSX.Element => {
  const { loggedIn } = useSelector((state: AppState) => state.session);
  const { updateSession } = useAction();
  const [{ status, result }, fetchLogin] = useFetch('/api/auth/login');
  const [form, setForm] = useState<FormData>();

  // load form
  useEffect(() => {
    void (async () => {
      const json: any = (await import('./login.json')).default;
      setForm(json);
    })();
  }, [])

  useEffect(() => {
    if (status === 'success' && result.ok) {
      const { user } = result?.data;
      updateSession({ loggedIn: true, user, orgId: null });
    }
  }, [status]);

  const handleSubmit = (values: any) => {
    console.log('SUBMIT VALUES', values);
    void fetchLogin({ body: values });
  };


  if (loggedIn) {
    return <Navigate to="/" />;
  }

  if (!form) {
    return <div>loadding...</div>;
  }

  return (
    <div>
      {/* <Form onSubmit={handleSubmit}>
        <Block type="header">
          LOGIN
        </Block>
        <Block type="main">
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
        </Block>
        <Block type="footer">
          <Element
            label="Login"
            name="submit"
            type="button"
          />
        </Block>
      </Form> */}
      <Form form={form} onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;