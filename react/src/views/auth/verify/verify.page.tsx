import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { Form, FormData } from '../../../components/form';
import { useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';
import Confirm from './verify.comfirm';


const Verify: React.FC = (): JSX.Element => {
  const { loggedIn, orgId, user } = useSelector((state: AppState) => state.session);
  const [{ loading, result }, fetchVerify] = useFetch('/api/auth/verify');
  const [form, setForm] = useState<FormData>();
  const [confirmed, setConfirmed] = useState(false);

  // Load form
  useEffect(() => {
    void (async () => {
      const json: any = (await import('./form-verify.json')).default;
      setForm(json);
    })();
  }, []);

  useEffect(() => {
    if (loading == 'success') {
      setConfirmed(true);
    }
  }, [loading]);

  const handleSubmit = (values: any) => {
    console.log(values);
    void fetchVerify({ body: values });
  };

  if (!user) {
    return <Navigate to="../login" />;
  }

  if (user && user.isActive && !orgId) {
    return <Navigate to="../setup" />;
  }

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return <div>
    {
      !confirmed ?
        <Form form={form} loading={loading} isMap={true} onSubmit={handleSubmit} /> :
        <Confirm setConfirmed={setConfirmed} />
    }
  </div>

}

export default Verify;