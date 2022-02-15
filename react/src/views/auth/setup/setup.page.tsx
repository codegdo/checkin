import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAction, useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';
import { Form, FormData } from '../../../components/form';
import { Navigate } from 'react-router-dom';
import { objectToKeyValue } from '../../../utils';

const Setup: React.FC = (): JSX.Element => {
  const { isLogin, user } = useSelector((state: AppState) => state.session);
  const { updateSession } = useAction();

  const [{ status: submit, result: resultSubmit }, fetchSetup] = useFetch('/api/auth/setup');
  const [{ status: loading, result: resultLoading }, fetchForm] = useFetch('/api/auth/form?name=auth_setup');
  const [form, setForm] = useState<FormData>();

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
    if (submit == 'success') {
      const { user, orgId, accessToken } = resultSubmit.data;
      updateSession({
        isLogin: true,
        user,
        orgId,
        accessToken
      });
    }
  }, [submit]);

  const handleSubmit = (values: any) => {
    console.log(values);
    void fetchSetup({
      body: {
        loginId: user?.id,
        data: JSON.stringify(objectToKeyValue(values))
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

export default Setup;