import React from 'react';

import { Form } from '../../components/form/form.component';
import { Block } from '../../components/form/form.block';
import { Field } from '../../components/form/form.field';
import { GridView } from '../../components/gridview/gridview.component';
import { Column } from '../../components/gridview/gridview.column';

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

export const Login: React.FC = (): JSX.Element => {
  return <>
    <Form title="Login">
      <Block>
        <Field type="text" name="username" />
      </Block>
    </Form>
    <GridView>
      <Column type="text" name="username" />
    </GridView>
  </>
}