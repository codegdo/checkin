import React from 'react';
import { Form, Block, Field, Grid, Group, Element } from '../../../components/form';

const Login: React.FC = (): JSX.Element => {

  return <>
    <Form title="Login">
      <Block type="section">
        <Field type="text" name="username" label="Username" isRequired={true} />
        <Field type="password" name="password" label="Password" isRequired={true} />
      </Block>
      <Block type="section">
        <Element type="button" name="submit" label="Login" />
      </Block>
    </Form>
  </>;
};

export default Login;