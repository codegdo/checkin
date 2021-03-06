import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useFetch, useLogin } from '../../../hooks';
import { AppState } from '../../../store/reducers';
import { Form, FormData } from '../../../components/form';
import { Navigate } from 'react-router-dom';
import { objectToKeyValue } from '../../../utils';

const SetupForm: React.FC = (): JSX.Element => {
  const { isLogin, user } = useSelector((state: AppState) => state.session);
  const [_, login] = useLogin();
  const [{ status: submit, response: { data: submitData } }, postSetup] = useFetch('/api/auth/setup');
  const [{ status: loading, response: { data: formData } }, getForm] = useFetch('/api/auth/setup?formName=auth_setup');
  const [form, setForm] = useState<FormData>();

  // load form
  useEffect(() => {
    void (async () => {
      await getForm();
    })();
  }, []);

  useEffect(() => {
    if (loading === 'success') {
      setForm(formData);
    }
  }, [loading]);

  useEffect(() => {
    if (submit == 'success') {
      login(submitData);
    }
  }, [submit]);

  const handleSubmit = (values: any) => {
    void postSetup({
      body: {
        data: JSON.stringify(objectToKeyValue(values)),
        loginId: user?.id
      }
    });
  };

  if (!form) {
    return <div>loadding...</div>;
  }

  if (!user) {
    return <Navigate to="../login" />;
  }

  if (isLogin) {
    return <Navigate to="/" />;
  }

  return <>
    {submit === 'error' && <div>Error</div>}
    <Form form={form} isKey={true} status={submit} onSubmit={handleSubmit} />
  </>
}

export default SetupForm;