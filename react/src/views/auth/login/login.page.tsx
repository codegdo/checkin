import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { useAction, useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';

import { Form, FormData } from '../../../components/form';

const Login: React.FC = (): JSX.Element => {
  const { loggedIn, orgId, user } = useSelector((state: AppState) => state.session);
  const { updateSession } = useAction();
  const [form, setForm] = useState<FormData>();
  const navigate = useNavigate();
  const [{ loading, result }, fetchLogin] = useFetch('/api/auth/login');
  const [verify, setVerify] = useState(false);

  // load form
  useEffect(() => {
    void (async () => {
      const json: any = (await import('./login.json')).default;
      setForm(json);
    })();
  }, [])

  useEffect(() => {
    if (loading === 'success' && result.ok) {
      const { user: _user, orgId: _orgId, accessToken } = result?.data;

      if (_user && !_orgId) {
        updateSession({
          user: _user
        });

      } else {
        updateSession({
          loggedIn: true,
          user: _user,
          orgId: _orgId,
          accessToken
        });
      }
    }

  }, [loading]);

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn]);

  useEffect(() => {
    if (user && !orgId) {
      //navigate('../verify');
      setVerify(true);
    }
  }, [user]);

  const handleSubmit = (values: any) => {
    console.log('SUBMIT VALUES', values);
    void fetchLogin({ body: values });
  };

  if (!form) {
    return <div>loading...</div>;
  }

  if (verify) {
    return <Navigate to="../verify" />
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