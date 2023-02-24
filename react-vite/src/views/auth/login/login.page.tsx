import React, { useEffect } from 'react';

import { Form, Block, Field, Grid, Group, Element } from '../../../components/form';
import { loginApi } from './login.api'
import { useAction, useRedirect } from '../../../hooks';

const Login: React.FC = (): JSX.Element => {

  const { updateCurrent, updateUser } = useAction();
  const { status, isSuccess, data, mutate: submitLogin } = loginApi();

  useRedirect();

  useEffect(() => {
    if (isSuccess && data) {
      const { current, user } = data;
      updateCurrent(current);
      updateUser(user);
    }
  }, [isSuccess, data]);

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


