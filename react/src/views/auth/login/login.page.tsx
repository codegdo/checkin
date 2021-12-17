import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { useAction, useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';

import { Form, FormData } from '../../../components/form';

const Login: React.FC = (): JSX.Element => {
  const { loggedIn, user, orgId } = useSelector((state: AppState) => state.session);
  const { updateSession } = useAction();

  const [form, setForm] = useState<FormData>();
  const [{ loading, result }, fetchLogin] = useFetch('/api/auth/login');
  const [verified, setVerified] = useState(true);
  const [completed, setCompleted] = useState(true);

  // load form
  useEffect(() => {
    void (async () => {
      const json: any = (await import('./form-login.json')).default;
      setForm(json);
    })();
  }, [])

  useEffect(() => {
    if (loading === 'success') {
      const { user, orgId, accessToken } = result?.data;

      if (user && !user.isActive) {
        updateSession({ user });
        setVerified(false);
      }

      if (user && user.isActive && !orgId) {
        updateSession({ user });
        setCompleted(false);
      }

      if (user && orgId) {
        updateSession({
          loggedIn: true,
          user,
          orgId,
          accessToken
        });
      }
    }

  }, [loading]);

  const handleSubmit = (values: any) => {
    void fetchLogin({ body: values });
  };

  if (!form) {
    return <div>loading...</div>;
  }

  if (!verified) {
    return <Navigate to="../verify" />
  }

  if (!completed) {
    return <Navigate to="../setup" />
  }

  if (loggedIn) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <Form form={form} loading={loading} onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;

/*
<Form loading={loading} onSubmit={handleSubmit}>
  <FormBlock type="header">
    <FormElement
      name="Login"
      type="title"
    />
  </FormBlock>
  <FormBlock type="main">
    <FormField field={{
      label: "Username",
      name: "username",
      type: "text",
      isRequired: true
    }}
    />
    <FormField
      label="Email"
      name="email"
      type="email"
      isRequired={true}
    />
    <FormField
      label="Password"
      name="password"
      type="password"
      isRequired={true}
    />
  </FormBlock>
  <FormBlock type="footer">
    <FormElement
      label="Login"
      name="submit"
      type="button"
    />
    <FormElement
      label="Signup"
      type="link"
      value="/auth/signup"
    />
  </FormBlock>
</Form>
*/