import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useFetch } from '../../../hooks';
import { Form, FormData } from '../../../components/form';

//import { useAction, useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';

const Trial: React.FC = (): JSX.Element => {
  const { loggedIn, orgId } = useSelector((state: AppState) => state.session);
  const navigate = useNavigate();

  const [{ loading, result }, fetchTrial] = useFetch('/api/auth/trial');
  const [form, setForm] = useState<FormData>();

  // Load form
  useEffect(() => {
    void (async () => {
      const json: any = (await import('./trial.json')).default;
      setForm(json);
    })();
  }, [])

  useEffect(() => {
    if (!loggedIn && !orgId) {
      navigate('/');
    }
  }, [loggedIn, orgId]);

  const handleSubmit = (values: any) => {
    console.log(values);
    void fetchTrial({ body: values });
  };

  if (!form) {
    return <div>loadding...</div>;
  }

  return <div>
    <Form form={form} loading={loading} isMap={true} onSubmit={handleSubmit} />
  </div>
}

export default Trial;