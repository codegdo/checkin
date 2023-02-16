import React, { useEffect } from 'react';

import { Form, Block, Field, Grid, Group, Element } from '../../../components/form';
import { useLogin } from './use-login.hook';
import { loginApi } from './login.api'


const Login: React.FC = (): JSX.Element => {

  const { status, isSuccess, data, mutate: submitLogin } = loginApi();
  const [_, loginUser] = useLogin();

  useEffect(() => {
    if (isSuccess) {
      loginUser(data);
    }
  }, [isSuccess]);

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

  return <Form title="Login" status={status} onCallback={handleCallback}>
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


