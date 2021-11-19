import React, { useEffect, useState } from 'react';

import { useFetch } from '../../../hooks';
import { Form, FormData } from '../../../components/form';
import SignupSuccess from './signup.success';

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
    if (loading === 'error') {
      console.log(result);
    }
  }, [loading]);

  const handleSubmit = (values: any) => {
    console.log(values);
    void fetchSignup({ body: values });
  };

  if (!form) {
    return <div>loading...</div>;
  }

  if (loading === 'success') {
    return <SignupSuccess data={result.data} />;
  }

  return (
    <>
      {loading === 'error' && <div>Error</div>}
      <Form form={form} loading={loading} isMap={true} onSubmit={handleSubmit} />
    </>
  );
};

export default Signup;