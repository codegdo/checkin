import React from 'react';

import { Form } from '../../../components/form/form.component';
import { Block } from '../../../components/form/form.block';
import { Field } from '../../../components/form/form.field';
import { GridView } from '../../../components/gridview/gridview.component';
import { Column } from '../../../components/gridview/gridview.column';
import { Button } from '../../../components/element/element.button';
import { Group } from '../../../components/form/form.group';
import { Grid } from '../../../components/form/form.grid';

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
        <Field type="text" name="username" label="Username" />
        <Group>
          <Field type="text" name="firstName" label="First Name" />
          <Field type="text" name="lastName" label="Last Name" />
        </Group>
        <Grid>
          <Field type="text" name="firstName" label="First Name" />
          <Field type="text" name="lastName" label="Last Name" />
        </Grid>
      </Block>
    </Form>

    <GridView data={[{ username: 'john' }]}>
      <Column name="username" />
    </GridView>
  </>
}

export default Login;