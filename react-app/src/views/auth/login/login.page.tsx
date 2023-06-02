import React, { useEffect } from 'react';

import { Form, FormBlock, FormField, FormGrid, FormGroup, FormElement } from '../../../components/form';
import { loginApi } from './login.api'
import { useAction, useRedirect } from '../../../hooks';

import { randomString } from 'shared-code';

function Login() {

  const { updateCurrent, updateUser } = useAction();
  const { status, isSuccess, data, mutate: submitLogin } = loginApi();

  const rd = randomString();

  console.log(rd);

  useRedirect();

  useEffect(() => {
    if (isSuccess && data) {
      const { current, user } = data;
      updateCurrent(current);
      updateUser(user);
    }
  }, [isSuccess, data]);

  const handleCallback = (data: string | Record<string, string>) => {
    if (typeof data === 'object') {
      submitLogin({ body: data });
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


