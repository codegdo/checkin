import React, { useEffect, useState } from 'react';
import { Form } from '../../../components/form';
import { useFormJson } from '../../../hooks';

const Signup: React.FC = (): JSX.Element => {
  const form = useFormJson('signup.form.json');

  if (!form) {
    return <div>loading...</div>;
  }

  console.log(form);

  return <Form title={form?.label} data={form.data} options={{ keyOption: 'id' }} />;
}

export default Signup;