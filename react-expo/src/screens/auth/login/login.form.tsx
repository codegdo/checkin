import React, { useEffect, useState } from 'react';

import * as json from './login.json';
import { Form, Block, Field, Container } from '../../../components';
import { useFetch, useLogin } from '../../../hooks';

export const LoginForm: React.FC = () => {
  const [{ status, response: { data } }, getLogin] = useFetch('/api/auth/login');
  const [_, login] = useLogin();
  const [form, setForm] = useState<any>();

  // load form
  useEffect(() => {
    setForm(json);
  }, []);

  // login
  useEffect(() => {
    if (data?.user) {
      login(data);
    }
  }, [data]);

  const handleCallback = async (values: Record<string, string>): Promise<void> => {
    await getLogin({ body: values });
  }

  return <Container className='container center'>
    <Form data={form} callback={handleCallback}>
      <Block className="form-main">
        <Field
          id="1"
          type="email"
          name="username"
          placeholder="Username"
          className="form-field.label.input"
          isRequired={true}
        />
        <Field
          id="2"
          type="password"
          name="password"
          placeholder="Password"
          className="form-field.label.input"
          isRequired={true}
        />
      </Block>
      <Block className="form-footer">
        <Field
          id="3"
          type="button"
          name="submit"
          title="Login"
          className="form-field.button.button-text"
        />
      </Block>
    </Form>
  </Container>
}