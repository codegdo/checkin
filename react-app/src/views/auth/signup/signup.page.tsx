import React, { useEffect, useState } from 'react';
import { Form, FormData, formHelper } from '../../../components/form';

function Signup() {
  const [formData, setFormData] = useState<FormData>();

  useEffect(() => {
    const loadFormData = async () => {
      const json = await import('./signup.form.json');
      setFormData(json.default as any);
    }

    loadFormData();
  }, []);

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
    title={form.label}
    data={form.data}
    options={form.options}
    onCallback={handleCallback}
  />;
}


export default Signup;