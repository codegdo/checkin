import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useAction, useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';

import { Form, FormData } from '../../../components/form';

const LoginForm: React.FC = (): JSX.Element => {
  const { isLogin } = useSelector((state: AppState) => state.session);
  const { updateSession, updateNav, updatePolicy } = useAction();

  const [form, setForm] = useState<FormData>();
  const [{ status, result }, fetchLogin] = useFetch('/api/auth/login');
  const [verified, setVerified] = useState(true);
  const [completed, setCompleted] = useState(true);

  // load form
  useEffect(() => {
    void (async () => {
      const json: any = (await import('./login.form.json')).default;
      setForm(json);
    })();
  }, []);

  useEffect(() => {
    if (status === 'success') {
      const { user, bizId, accessToken, nav, policy } = result?.data;

      console.log(result.data);

      if (user && !user.isActive) {
        updateSession({ user });
        setVerified(false);
      }

      if (user && user.isActive && !bizId) {
        updateSession({ user });
        setCompleted(false);
      }

      if (user && bizId) {
        updateSession({
          isLogin: true,
          user,
          bizId,
          accessToken
        });
        updateNav(nav);
        updatePolicy(policy);
      }
    }

  }, [status]);

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

  if (isLogin) {
    return <Navigate to="/" />
  }

  return (
    <>
      {status === 'error' && <div>Error</div>}
      <Form form={form} status={status} onSubmit={handleSubmit} />
    </>
  );
};

export default LoginForm;

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