import React, { useEffect } from 'react';

import { Form, FormBlock, FormField, FormGrid, FormGroup, FormElement } from '../../../components/form';
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
    <FormBlock type="section">
      <FormBlock>
        <FormField type="text" name="username" label="Username" isRequired={true} />
        <FormField type="password" name="password" label="Password" isRequired={true} />
      </FormBlock>
    </FormBlock>
    <FormBlock type="section">
      <FormElement type="button" name="submit" label="Login" />
      <FormElement type="button" name="reset" label="Reset" />
    </FormBlock>
  </Form>;
};

export default Login;


