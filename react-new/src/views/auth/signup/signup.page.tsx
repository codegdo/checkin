import React from 'react';

import { Form } from '../../../components/form/form.component';
import { Block } from '../../../components/form/form.block';
import { Field } from '../../../components/form/form.field';

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

  console.log(props);

  return <>
    <Form title="Signup">
      <Block>
        <Field type="text" name="username" />
      </Block>
    </Form>
  </>
}

export default Signup;