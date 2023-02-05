import React from 'react';
import { Form, Block, Field, Grid, Group, Element } from '../../../components/form';

const Login: React.FC = (): JSX.Element => {

  return <>
    <Form title="Login">
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
    </Form>
  </>;
};

export default Login;