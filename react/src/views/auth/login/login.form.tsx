import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useFetch, useLogin } from '../../../hooks';
import { AppState } from '../../../store/reducers';

import { Form, FormData } from '../../../components/form';

const LoginForm: React.FC = (): JSX.Element => {
  const { user } = useSelector((state: AppState) => state.session);

  const [form, setForm] = useState<FormData>();
  const [{ status, result }, fetchLogin] = useFetch('/api/auth/login');
  const [{ isUserVerified, isUserSetupCompleted }, login] = useLogin();

  // load form
  useEffect(() => {
    void (async () => {
      const json: any = (await import('./login.form.json')).default;
      setForm(json);
    })();
  }, []);

  useEffect(() => {
    if (status === 'success') {
      login(result.data);
    }

  }, [status]);

  const handleSubmit = (values: any) => {
    void fetchLogin({ body: values });
  };

  if (!form) {
    return <div>loading...</div>;
  }

  if (!isUserVerified) {
    return <Navigate to="../verify" />
  }

  if (!isUserSetupCompleted) {
    return <Navigate to="../setup" />
  }

  if (user) {
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