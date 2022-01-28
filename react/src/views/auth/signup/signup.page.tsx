import React, { useEffect, useState } from 'react';

import { useAction, useFetch } from '../../../hooks';
import { Form, FormData } from '../../../components/form';
import { Navigate } from 'react-router-dom';
import { objectToKeyValue } from '../../../utils';

const Signup: React.FC = (): JSX.Element => {

  const { updateSession } = useAction();
  const [{ loading, result }, fetchSignup] = useFetch('/api/auth/signup');
  const [{ loading: _loading, result: _result }, getForm] = useFetch('/api/auth/form/signup');
  const [form, setForm] = useState<FormData>();
  const [verified, setVerified] = useState(false);

  // load form
  useEffect(() => {
    void (async () => {
      await getForm();
    })();
  }, []);

  useEffect(() => {
    if (_loading === 'success') {
      setForm(_result.data);
    }
  }, [_loading]);

  useEffect(() => {

    if (loading === 'success') {

      if (result?.data) {
        updateSession({ user: result.data });
        setVerified(true);
      }

    }

  }, [loading]);

  const handleSubmit = (values: any) => {
    console.log(objectToKeyValue(values));
    void fetchSignup({
      body: {
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
      {loading === 'error' && <div>Error</div>}
      <Form form={form} isKey={true} loading={loading} onSubmit={handleSubmit} />
    </>
  );
};

export default Signup;