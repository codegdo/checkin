import React, { useEffect, useState } from 'react';

import { useAction, useFetch } from '../../../hooks';
import { Form, FormData } from '../../../components/form';
import { Navigate } from 'react-router-dom';

const Signup: React.FC = (): JSX.Element => {

  const { updateSession } = useAction();
  const [{ loading, result }, fetchSignup] = useFetch('/api/auth/signup');
  const [form, setForm] = useState<FormData>();
  const [verified, setVerified] = useState(false);

  // Load form
  useEffect(() => {
    void (async () => {
      const json: any = (await import('./signup.page.json')).default;
      setForm(json);
    })();
  }, [])

  useEffect(() => {

    if (loading === 'success') {

      if (result?.data) {
        updateSession({ user: result.data });
        setVerified(true);
      }

    }

  }, [loading]);

  const handleSubmit = (values: any) => {
    void fetchSignup({ body: values });
  };

  if (!form) {
    return <div>loading...</div>;
  }

  if (verified) {
    return <Navigate to="../verify" />
  }

  return (
    <>
      {loading === 'error' && <div>Error</div>}
      <Form form={form} loading={loading} onSubmit={handleSubmit} />
    </>
  );
};

export default Signup;