import React, { useEffect, useState } from 'react';

import { useFetch } from '../../../hooks';
import { Form, FormData } from '../../../components/form';

const Resend: React.FC = (): JSX.Element => {

  //const { updateSession } = useAction();
  const [{ loading, result }, fetchSignup] = useFetch('/api/auth/signup');
  const [form, setForm] = useState<FormData>();

  // Load form
  useEffect(() => {
    void (async () => {
      const json: any = (await import('./resend.json')).default;
      setForm(json);
    })();
  }, [])

  useEffect(() => {
    if (loading === 'success' && result.ok) {
      //
    }
  }, [loading]);

  const handleSubmit = (values: any) => {
    console.log(values);
    void fetchSignup({ body: values });
  };

  if (!form) {
    return <div>loading...</div>;
  }

  return (
    <Form form={form} loading={loading} isMap={true} onSubmit={handleSubmit} />
  );
};

export default Resend;