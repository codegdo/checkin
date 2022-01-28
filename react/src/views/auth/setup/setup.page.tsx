import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAction, useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';
import { Form, FormData } from '../../../components/form';
import { Navigate } from 'react-router-dom';

const Setup: React.FC = (): JSX.Element => {
  const { loggedIn, user } = useSelector((state: AppState) => state.session);
  const { updateSession } = useAction();

  const [{ loading, result }, fetchSetup] = useFetch('/api/auth/setup');
  const [{ loading: _loading, result: _result }, getForm] = useFetch('/api/auth/form/auth_setup');
  const [form, setForm] = useState<FormData>();

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
    if (loading == 'success') {
      const { user, orgId, accessToken } = result?.data;
      updateSession({
        loggedIn: true,
        user,
        orgId,
        accessToken
      });
    }
  }, [loading]);

  const handleSubmit = (values: any) => {
    console.log(values);
    void fetchSetup({ body: { ...values, username: user?.username } });
  };

  if (!form) {
    return <div>loadding...</div>;
  }

  if (!user) {
    return <Navigate to="../login" />;
  }

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return <>
    {loading === 'error' && <div>Error</div>}
    <Form form={form} isKey={true} loading={loading} onSubmit={handleSubmit} />
  </>
}

export default Setup;