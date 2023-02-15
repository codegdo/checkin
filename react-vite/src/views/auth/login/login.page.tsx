import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form, Block, Field, Grid, Group, Element } from '../../../components/form';
import { useLogin } from '../../../hooks';
import { loginApi } from './login.api'
import { LoginData } from './login.type';

const Login: React.FC = (): JSX.Element => {

  const { status: loadingStatus, isSuccess, data, mutate: submitLogin } = loginApi<LoginData>();
  const { status: userStatus, loggedIn, callback: validateLogin } = useLogin();
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess && data) {
      validateLogin(data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn]);

  const handleCallback = (keyname: any, data: any) => {
    switch (keyname) {
      case 'submit':
        submitLogin({ body: data });
        break;
      case 'cancel':
        break;
      default:
    }

  }

  return <Form title="Login" status={loadingStatus} onCallback={handleCallback}>
    <Block type="section">
      <Block>
        <Field type="text" name="username" label="Username" isRequired={true} />
        <Field type="password" name="password" label="Password" isRequired={true} />
      </Block>
    </Block>
    <Block type="section">
      <Element type="button" name="submit" label="Login" />
      <Element type="button" name="reset" label="Reset" />
    </Block>
  </Form>;
};

export default Login;


