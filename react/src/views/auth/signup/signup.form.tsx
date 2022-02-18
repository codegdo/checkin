import React, { useEffect, useState } from 'react';

import { useAction, useFetch } from '../../../hooks';
import { Form, FormData } from '../../../components/form';
import { Navigate } from 'react-router-dom';
import { objectToKeyValue } from '../../../utils';

const SignupForm: React.FC = (): JSX.Element => {

  const { updateSession } = useAction();
  const [{ status: submit, result: resultSubmit }, fetchSignup] = useFetch('/api/auth/signup');
  const [{ status: loading, result: resultLoading }, fetchForm] = useFetch('/api/auth/form?name=auth_signup');
  const [form, setForm] = useState<FormData>();
  const [verified, setVerified] = useState(false);

  // load form
  useEffect(() => {
    void (async () => {
      await fetchForm();
    })();
  }, []);

  useEffect(() => {
    if (loading === 'success') {
      setForm(resultLoading.data);
    }
  }, [loading]);

  useEffect(() => {

    if (submit === 'success') {

      if (resultSubmit.data) {
        updateSession({ user: resultSubmit.data });
        setVerified(true);
      }

    }

  }, [submit]);

  const handleSubmit = (values: any) => {
    //console.log(objectToKeyValue(values));
    void fetchSignup({
      body: {
        formName: 'auth_signup',
        data: JSON.stringify(objectToKeyValue(values))
      }
    });
  };

  if (!form) {
    return <div>loading...</div>;
  }

  if (verified) {
    return <Navigate to="../verify" />
  }

  return (
    <>
      {submit === 'error' && <div>Error</div>}
      <Form form={form} isKey={true} status={submit} onSubmit={handleSubmit} />
    </>
  );
};

export default SignupForm;