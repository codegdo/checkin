import React from 'react';
import { Form, FormData, formHelper } from '../../../components/form';
import { useLoadJson } from '../../../hooks';

function Signup() {
  const [formData] = useLoadJson<FormData>('signup.form.json');

  if (!formData) {
    return <div>loading...</div>;
  }

  const normalizedData = formHelper.normalizeFormData(formData);
  const form = { ...formData, data: normalizedData };

  const handleCallback = (data: string | Record<string, string>) => {
    if (typeof data === 'object') {
      console.log(data);
    }
  }

  return <Form
    title={form?.label}
    data={form.data}
    options={{ mapKey: 'id', isMultiSteps: true, animation: 'slide' }}
    steps={['1', '2', '3']}
    onCallback={handleCallback}
  />;
}


export default Signup;