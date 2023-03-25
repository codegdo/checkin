import React, { useEffect, useState } from 'react';
import { Form, FormData } from '../../../components/form';
import { formHelper } from '../../../helpers';
import { useLoadJson } from '../../../hooks';

const Signup: React.FC = (): JSX.Element => {
  const [formData] = useLoadJson<FormData>('signup.form.json');

  if (!formData) {
    return <div>loading...</div>;
  }

  const normalizedData = formHelper.normalize(formData);
  const form = { ...formData, data: normalizedData };

  return <Form title={form?.label} data={form.data} options={{ keyOption: 'id' }} />;
}


export default Signup;