import React, { useEffect, useState } from 'react';

import { useAction, useFetch } from '../../../hooks';
import { Form, FormData } from '../../../components/form';
import { Navigate, useNavigate } from 'react-router-dom';
import { objectToKeyValue } from '../../../utils';

const SignupForm: React.FC = (): JSX.Element => {

  const { updateSession } = useAction();
  const navigate = useNavigate();
  const [{ status: submit, response: { data: submitData } }, postSignup] = useFetch('/api/auth/signup');
  const [{ status: loading, response: { data: formData } }, getForm] = useFetch('/api/auth/signup?formName=auth_signup');
  const [form, setForm] = useState<FormData>();
  const [verified, setVerified] = useState(false);

  // load form
  useEffect(() => {
    void (async () => {
      await getForm();
    })();
  }, []);

  useEffect(() => {
    if (loading === 'success' && formData) {
      setForm(formData);
    }
  }, [loading]);

  useEffect(() => {

    if (submit === 'success' && submitData) {
      updateSession({ user: submitData });
      setVerified(true);
    }

  }, [submit]);

  const handleSubmit = (values: any) => {
    //console.log(objectToKeyValue(values));
    void postSignup({
      body: {
        formName: 'auth_signup',
        data: JSON.stringify(objectToKeyValue(values))
      }
    });
  };

  const handleCallback = (name: string) => {
    switch (name) {
      case 'cancel':
        navigate(-1);
      default:
        return;
    }
  }

  if (!form) {
    return <div>loading...</div>;
  }

  if (verified) {
    return <Navigate to="../verify" />
  }

  return (
    <>
      {submit === 'error' && <div>Error</div>}
      <Form form={form} isKey={true} status={submit} onSubmit={handleSubmit} onCallback={handleCallback} />
    </>
  );
};

export default SignupForm;