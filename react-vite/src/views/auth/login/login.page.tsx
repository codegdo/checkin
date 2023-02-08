import React, { useEffect } from 'react';
import {
  useMutation,
  useQuery,
  UseQueryOptions,
  QueryFunctionContext,
} from '@tanstack/react-query';

import { Form, Block, Field, Grid, Group, Element } from '../../../components/form';
import { loginApi } from './login.api'

const Login: React.FC = (): JSX.Element => {


  const { data, isLoading, mutate } = loginApi();


  console.log(data);

  const handleCallback = (key: any, data: any) => {
    console.log(key, data);
    mutate({ body: data });
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
