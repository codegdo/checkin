import React, { useEffect, useState } from 'react';
//import { useSelector } from 'react-redux';

import { useFetch } from '../../../hooks';
import { Form, FormData } from '../../../components/form';

//import { useAction, useFetch } from '../../../hooks';
//import { AppState } from '../../../store/reducers';

const Setup: React.FC = (): JSX.Element => {
  //const { loggedIn, orgId } = useSelector((state: AppState) => state.session);

  const [{ loading, result }, fetchSetup] = useFetch('/api/auth/setup');
  const [form, setForm] = useState<FormData>();

  // Load form
  useEffect(() => {
    void (async () => {
      const json: any = (await import('./setup.json')).default;
      setForm(json);
    })();
  }, [])

  const handleSubmit = (values: any) => {
    console.log(values);
    void fetchSetup({ body: values });
  };

  if (!form) {
    return <div>loadding...</div>;
  }

  return <div>
    <Form form={form} loading={loading} isMap={true} onSubmit={handleSubmit} />
  </div>
}

export default Setup;