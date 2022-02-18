import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormData } from '../../../components/form';
import { useFetch } from '../../../hooks';

const UserForm: React.FC = (props): JSX.Element => {

  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>();
  const [{ status, result }, postUser] = useFetch('/api/setup/users');

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
      {status === 'error' && <div>Error</div>}
      <Form form={form} status={status} onSubmit={handleSubmit} onCallback={handleCallback} />
    </>
  );
};

export default UserForm;