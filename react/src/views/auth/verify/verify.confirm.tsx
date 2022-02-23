import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { Form, FormData } from '../../../components/form';
import { useAction, useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';


const Confirm: React.FC<any> = ({ setConfirmed }): JSX.Element => {
  const { isLogin, bizId, user } = useSelector((state: AppState) => state.session);
  const [{ status, result }, fetchConfirm] = useFetch('/api/auth/confirm');
  const [form, setForm] = useState<FormData>();
  const [isActive, setIsActive] = useState(false);
  const { updateSession } = useAction();

  // Load form
  useEffect(() => {
    void (async () => {
      const json: any = (await import('./verify.confirm.json')).default;
      setForm(json);
    })();
  }, []);

  useEffect(() => {
    if (status == 'success') {
      updateSession({ user: { ...user, isActive: true } });
      setIsActive(true);
    }
  }, [status]);

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

  if (isActive) {
    return <Navigate to="../setup" />;
  }

  if (isLogin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {status === 'error' && <div>Error</div>}
      <Form form={form} status={status} onSubmit={handleSubmit} onCallback={handleCallback} />
    </>
  );
}

export default Confirm;