import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAction, useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';

import { Form, FormData } from '../../../components/form';

const Login: React.FC = (): JSX.Element => {
  const { loggedIn, orgId } = useSelector((state: AppState) => state.session);
  const { updateSession } = useAction();
  const [form, setForm] = useState<FormData>();
  const navigate = useNavigate();
  const [{ loading, result }, fetchLogin] = useFetch('/api/auth/login');

  // load form
  useEffect(() => {
    void (async () => {
      const json: any = (await import('./login.json')).default;
      setForm(json);
    })();
  }, [])

  useEffect(() => {
    if (loading === 'success' && result.ok) {
      const { user, accessToken } = result?.data;
      updateSession({ loggedIn: true, user, orgId: user.orgId, accessToken });
    }

  }, [loading]);

  useEffect(() => {
    if (loggedIn) {
      orgId ? navigate('/') : navigate('../trial');
    }
  }, [loggedIn, orgId]);

  const handleSubmit = (values: any) => {
    console.log('SUBMIT VALUES', values);
    void fetchLogin({ body: values });
  };

  if (!form) {
    return <div>loading...</div>;
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