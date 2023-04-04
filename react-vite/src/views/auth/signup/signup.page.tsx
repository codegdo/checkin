import React, { useEffect, useState } from 'react';
import { Form, FormData } from '../../../components/form';
import { formHelper } from '../../../helpers';
import { useLoadJson } from '../../../hooks';

function Signup() {
  const [formData] = useLoadJson<FormData>('signup.form.json');

  if (!formData) {
    return <div>loading...</div>;
  }

  const normalizedData = formHelper.normalize(formData);
  const form = { ...formData, data: normalizedData };

  const handleCallback = (data: string | Record<string, string>) => {
    if (typeof data === 'object') {
      console.log(data);
    }
  }

  return <Form
    title={form?.label}
    data={form.data}
    options={{ keyOption: 'id' }}
    onCallback={handleCallback}
  />;
}


export default Signup;