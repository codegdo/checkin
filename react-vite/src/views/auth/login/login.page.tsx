import React from 'react';
import {
  useMutation,
  useQuery,
  UseQueryOptions,
  QueryFunctionContext,
} from '@tanstack/react-query';

import { Form, Block, Field, Grid, Group, Element } from '../../../components/form';
import { useLoginApi } from './login.api'

const Login: React.FC = (): JSX.Element => {
  const { getLogin } = useLoginApi();
  const login = useMutation({
    mutationFn: getLogin
  });

  const handleCallback = (key: any, data: any) => {
    console.log(key, data);
    login.mutate(data);
  }

  return <>
    <Form title="Login" onCallback={handleCallback}>
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
