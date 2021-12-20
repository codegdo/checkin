import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { Form, FormData } from '../../../components/form';
import { useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';


const Confirm: React.FC<any> = ({ setConfirmed }): JSX.Element => {
  const { loggedIn, orgId, user } = useSelector((state: AppState) => state.session);
  const [{ loading, result }, fetchConfirm] = useFetch('/api/auth/verify/confirm');
  const [form, setForm] = useState<FormData>();

  // Load form
  useEffect(() => {
    void (async () => {
      const json: any = (await import('./verify.confirm.json')).default;
      setForm(json);
    })();
  }, []);

  const handleSubmit = (values: any) => {
    console.log(values);
    void fetchConfirm({ body: values });
  };

  const handleCallback = (value: any) => {
    //alert(value);
    setConfirmed(false);
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
    <Form form={form} loading={loading} isMap={true} onSubmit={handleSubmit} onCallback={handleCallback} />
  </div>

}

export default Confirm;