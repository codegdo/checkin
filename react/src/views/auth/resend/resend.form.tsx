import React, { useEffect, useState } from 'react';

import { useFetch } from '../../../hooks';
import { Form, FormData } from '../../../components/form';
import ResendSuccess from './resend.success';

const ResendForm: React.FC = (): JSX.Element => {

  //const { updateSession } = useAction();
  const [{ status, result }, fetchSignup] = useFetch('/api/auth/resend');
  const [form, setForm] = useState<FormData>();

  // Load form
  useEffect(() => {
    void (async () => {
      const json: any = (await import('./resend.form.json')).default;
      setForm(json);
    })();
  }, [])

  useEffect(() => {
    if (status === 'success' && result.ok) {
      //
    }
  }, [status]);

  const handleSubmit = (values: any) => {
    void fetchSignup({ body: values });
  };

  if (!form) {
    return <div>loading...</div>;
  }

  if (status === 'success') {
    return <ResendSuccess />;
  }

  return (
    <>
      {status === 'error' && <div>Error</div>}
      <Form form={form} status={status} onSubmit={handleSubmit} />
    </>
  );
};

export default ResendForm;