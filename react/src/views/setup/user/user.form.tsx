import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Form, FormData } from '../../../components/form';
import { useFetch } from '../../../hooks';
import { objectToKeyValue } from '../../../utils';
import { AppState } from '../../../store/reducers';

const UserForm: React.FC = (props): JSX.Element => {
  console.log('USER ADD', props);

  const { id = 0 } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();

  const { user } = useSelector((state: AppState) => state.session);
  const [form, setForm] = useState<FormData>();

  const [{ status: submit, result: { data: submitData } }, postUser] = useFetch('/api/setup/users');
  const [{ status: loading, result: { data: formData } }, getForm] = useFetch(`/api/setup/users/${id}${search}`);

  // load form
  useEffect(() => {
    void (async () => {
      await getForm();
    })();
  }, []);

  useEffect(() => {
    if (loading === 'success' && formData) {
      setForm(formData);
    }
  }, [loading]);

  useEffect(() => {
    if (submit == 'success') {
      console.log(submitData);
    }
  }, [submit]);

  const handleSubmit = (values: any) => {
    void postUser({
      body: {
        data: JSON.stringify(objectToKeyValue(values)),
        formId: form?.id,
        userId: id == 'new' ? 0 : id
      }
    });
  };

  const handleCallback = (name: string) => {
    console.log(name);
    navigate(-1);
  };

  if (!form) {
    return <div>loading...</div>;
  }

  return (
    <>
      {submit === 'error' && <div>Error</div>}
      <Form form={form} isKey={true} status={submit} onSubmit={handleSubmit} onCallback={handleCallback} />
    </>
  );
};

export default UserForm;