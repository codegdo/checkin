import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { Form, FormData } from '../../../components/form';
import { mapDataToFields } from '../../../helpers';
import { useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';
import { objectToKeyValue } from '../../../utils';
import Confirm from './verify.confirm';


const VerifyForm: React.FC = (): JSX.Element => {
  const { orgId, user } = useSelector((state: AppState) => state.session);
  const [{ status, response }, fetchVerify] = useFetch('/api/auth/verify');
  const [form, setForm] = useState<FormData>();
  const [confirmed, setConfirmed] = useState(false);

  // Load form
  useEffect(() => {
    void (async () => {
      const json: any = (await import('./verify.form.json')).default;
      const values = objectToKeyValue({ ...user }, ['emailAddress', 'phoneNumber']);

      const mapFields = {
        key: 'option',
        value: 'phoneNumber',
        data: values
      };

      mapDataToFields(json.fields, mapFields);

      setForm(json);
    })();
  }, []);

  useEffect(() => {
    if (status == 'success') {
      setConfirmed(true);
    }
  }, [status]);

  const handleSubmit = (values: any) => {
    void fetchVerify({
      body: {
        loginId: user?.id,
        data: values
      }
    });
  };

  if (!user) {
    return <Navigate to="../login" />;
  }

  if (user.isActive && !orgId) {
    return <Navigate to="../setup" />;
  }

  if (user.isActive && orgId) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {status === 'error' && <div>Error</div>}
      {
        !confirmed ?
          <Form form={form} status={status} onSubmit={handleSubmit} /> :
          <Confirm setConfirmed={setConfirmed} />
      }
    </>
  );

}

export default VerifyForm;