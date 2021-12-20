import React, { useEffect, useState } from 'react';

import { useFetch } from '../../../hooks';
import { Form, FormData } from '../../../components/form';
import ResendSuccess from './resend.success';

const Resend: React.FC = (): JSX.Element => {

  //const { updateSession } = useAction();
  const [{ loading, result }, fetchSignup] = useFetch('/api/auth/resend');
  const [form, setForm] = useState<FormData>();

  // Load form
  useEffect(() => {
    void (async () => {
      const json: any = (await import('./resend.page.json')).default;
      setForm(json);
    })();
  }, [])

  useEffect(() => {
    if (loading === 'success' && result.ok) {
      //
    }
  }, [loading]);

  const handleSubmit = (values: any) => {
    void fetchSignup({ body: values });
  };

  if (!form) {
    return <div>loading...</div>;
  }

  if (loading === 'success') {
    return <ResendSuccess />;
  }

  return (
    <>
      {loading === 'error' && <div>Error</div>}
      <Form form={form} loading={loading} onSubmit={handleSubmit} />
    </>
  );
};

export default Resend;