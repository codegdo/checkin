import React, { useEffect } from 'react';

import { Form } from '../../../components/form/form.component';
import { Block } from '../../../components/form/form.block';
import { Field } from '../../../components/form/form.field';
import { GridView } from '../../../components/gridview/gridview.component';
import { Column } from '../../../components/gridview/gridview.column';
import { Button } from '../../../components/element/element.button';
import { FieldGroup } from '../../../components/form/form.group';
import { FieldGrid } from '../../../components/form/form.grid';

import { colorHelper } from '../../../helpers';
import { tint, shade } from 'tint-shade-color';

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

  useEffect(() => {
    const tint = colorHelper.tintColor('#75e900', 0.5);
    const shade = colorHelper.shadeColor('#75e900', 0.5);
    const tints = colorHelper.tintPalette('#75e900', 4);

    const palette = colorHelper.fullPalette('#1ea3f8', 4, '$secondary');

    console.log(palette.join(' '));
    //console.log(shade);
  }, []);

  return <>
    <Form title="Login">
      <Block>
        <Field type="text" name="username" label="Username" />
        <Field type="password" name="password" label="Password" />
        <FieldGroup>
          <Field type="text" name="firstName" label="First Name" />
          <Field type="text" name="lastName" label="Last Name" />
        </FieldGroup>
        <FieldGrid>
          <Field type="text" name="firstName" label="First Name" />
          <Field type="text" name="lastName" label="Last Name" />
        </FieldGrid>
      </Block>
    </Form>
    <button type="button" className="button">Button</button>
    <button type="button" className="button btn-primary">Primary</button>
    <button type="button" className="button btn-secondary">Secondary</button>
    <button type="button" className="button btn-light">Light</button>
    <button type="button" className="button btn-dark">Dark</button>
  </>
}

export default Login;