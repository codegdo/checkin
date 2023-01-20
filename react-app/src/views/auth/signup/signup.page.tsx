import React from 'react';

import { Form } from '../../../components/form/form.component';
import { Block } from '../../../components/form/form.block';
import { Field } from '../../../components/form/form.field';
import { postSignupService } from './signup.service';

const form = {
  title: 'Login',
  data: [{
    id: 1,
    role: 'block',
    data: [
      {
        id: 2,
        name: 'username',
        type: 'text',
        role: 'field',
        data: null
      }
    ]
  }]
}

const Signup: React.FC = (props): JSX.Element => {

  const { status, data, postSignup } = postSignupService();

  const handleSubmit = () => {
    void postSignup({
      body: JSON.stringify({
        data: {
          firstName: 'giang',
          lastName: 'do',
          emailAddress: 'giang@cmr.bz',
          phoneNumber: '8583571474',
          username: 'gdo',
          password: '123456',
          groupId: 2
        }
      })
    });
  }

  return <>
    <Form title="Signup">
      <Block>
        <Field type="text" name="username" />
      </Block>
    </Form>
    <button type="button" onClick={handleSubmit}>submit</button>
  </>
}

export default Signup;