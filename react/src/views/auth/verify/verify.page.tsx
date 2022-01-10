import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { Form, FormData } from '../../../components/form';
import { mapDataToField } from '../../../helpers';
import { useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';
import { objectToKeyValue } from '../../../utils';
import Confirm from './verify.confirm';


const Verify: React.FC = (): JSX.Element => {
  const { loggedIn, orgId, user } = useSelector((state: AppState) => state.session);
  const [{ loading, result }, fetchVerify] = useFetch('/api/auth/verify');
  const [form, setForm] = useState<FormData>();
  const [confirmed, setConfirmed] = useState(false);

  // Load form
  useEffect(() => {
    void (async () => {
      const json: any = (await import('./verify.page.json')).default;
      const values = objectToKeyValue({ keys: ['emailAddress', 'phoneNumber'], values: { ...user } });

      console.log(values);

      const mapField = {
        name: 'verifyOption',
        value: 'phoneNumber',
        data: values
      };

      mapDataToField(json.fields, mapField);

      console.log(json);

      setForm(json);
    })();
  }, []);

  useEffect(() => {
    if (loading == 'success') {
      setConfirmed(true);
    }
  }, [loading]);

  const handleSubmit = (values: any) => {
    void fetchVerify({ body: { ...values, username: user?.username } });
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

  return (
    <>
      {loading === 'error' && <div>Error</div>}
      {
        !confirmed ?
          <Form form={form} loading={loading} onSubmit={handleSubmit} /> :
          <Confirm setConfirmed={setConfirmed} />
      }
    </>
  );

}

export default Verify;