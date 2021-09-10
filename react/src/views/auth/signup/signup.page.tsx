import React, { useEffect, useState } from 'react';

import { useFetch } from '../../../hooks';
import { Form, FormData } from '../../../components/form';

const Signup: React.FC = (): JSX.Element => {

  //const { updateSession } = useAction();
  const [{ loading, result }, fetchSignup] = useFetch('/api/auth/signup');
  const [form, setForm] = useState<FormData>();

  // Load form
  useEffect(() => {
    void (async () => {
      const json: any = (await import('./signup.json')).default;
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
    return <div>loadding...</div>;
  }

  return (
    <div>
      <Form form={form} loading={loading} onSubmit={handleSubmit} />
    </div>
  );
};

export default Signup;