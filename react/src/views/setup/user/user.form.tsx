import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormData } from '../../../components/form';
import { useFetch } from '../../../hooks';

const UserForm: React.FC = (): JSX.Element => {

  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>();
  const [{ status: submit, result }, postUser] = useFetch('/api/setup/users');
  //const [{ status: loading, result: formData}, getForm] = useFetch('/api/setup/users/new?name=user_add');

  // load form
  useEffect(() => {
    void (async () => {
      const json: any = (await import('./user.form.json')).default;
      setForm(json);
    })();
  }, []);

  const handleSubmit = (values: any) => {
    void postUser({ body: values });
  };

  const handleCallback = (name: string) => {
    console.log(name);
    navigate(-1);
  };

  return (
    <>
      {submit === 'error' && <div>Error</div>}
      <Form form={form} status={submit} onSubmit={handleSubmit} onCallback={handleCallback} />
    </>
  );
};

export default UserForm;