import React, { FC } from 'react';
import { Block, Field, FieldGrid, FieldGroup, Form } from '../../../components';

const Login: FC = (): JSX.Element => {
  return <>
    <Form title="Login">
      <Block>
        <Field type="text" name="username" label="Username" />
        <Field type="password" name="password" label="Password" />
        <FieldGroup>
          <Field type="text" name="firstName" label="First Name" />
          <Field type="text" name="lastName" label="Last Name" />
        </FieldGroup>
        <FieldGrid>
          <Field type="text" name="firstName" label="First Name" />
          <Field type="text" name="lastName" label="Last Name" />
        </FieldGrid>
      </Block>
    </Form>
  </>;
};

export default Login;