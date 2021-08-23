import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Joi from 'joi';

import { useAction, useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';

import { Form, FormBlock, FormField, FormElement, FormData } from '../../../components/form';

//const u = Joi.object().pattern(/^/, [Joi.string(), Joi.required()])
// const f = {
//   isRequired: true
// }

// let u = Joi.string();
// u = u.required();

// let p = Joi.string();
// p = p.required();

// const loginSchema = Joi.object({
//   username: u,
//   password: p
// })

// const login = { username: '', password: '' }

const Login: React.FC = (): JSX.Element => {
  const { loggedIn } = useSelector((state: AppState) => state.session);
  const { updateSession } = useAction();
  const [{ status, result }, fetchLogin] = useFetch('/api/auth/login');
  const [form, setForm] = useState<FormData>();

  // load form
  useEffect(() => {
    void (async () => {
      const json: any = (await import('./login.json')).default;
      setForm(json);
    })();
  }, [])

  useEffect(() => {
    if (status === 'success' && result.ok) {
      const { user } = result?.data;
      updateSession({ loggedIn: true, user, orgId: null });
    }
  }, [status]);

  // useEffect(() => {

  //   const { error, value } = loginSchema.validate(login, { abortEarly: false });
  //   console.log('JOI ERROR', error);
  //   console.log('JOI VALUE', value);

  // }, [])

  const handleSubmit = (values: any) => {
    console.log('SUBMIT VALUES', values);
    void fetchLogin({ body: values });
  };


  if (loggedIn) {
    return <Navigate to="/" />;
  }

  if (!form) {
    return <div>loadding...</div>;
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormBlock type="header">
          <FormElement
            name="Login"
            type="title"
          />
        </FormBlock>
        <FormBlock type="main">
          <FormField field={{
            label: "Username",
            name: "username",
            type: "text",
            isRequired: true
          }}
          />
          <FormField
            label="Password"
            name="password"
            type="password"
            isRequired={true}
          />
        </FormBlock>
        <FormBlock type="footer">
          <FormElement
            label="Login"
            name="submit"
            type="button"
          />
          <FormElement
            label="Signup"
            type="link"
            value="/auth/signup"
          />
        </FormBlock>
      </Form>

    </div>
  );
};

export default Login;