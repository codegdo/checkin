import React from 'react';

import { Form } from '../../../components/form/form.component';
import { Block } from '../../../components/form/form.block';
import { Field } from '../../../components/form/form.field';
import { GridView } from '../../../components/gridview/gridview.component';
import { Column } from '../../../components/gridview/gridview.column';
import { Button } from '../../../components/element/element.button';

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

const Login: React.FC = (props): JSX.Element => {

  console.log(props);

  return <>

    <Form title="Login">
      <Block>
        <Field type="text" name="username" />
      </Block>
    </Form>

    <GridView data={[{ username: 'john' }]}>
      <Column type="text" name="username">
        <Button />
      </Column>
      <Field type="text" name="username" />
    </GridView>
  </>
}

export default Login;