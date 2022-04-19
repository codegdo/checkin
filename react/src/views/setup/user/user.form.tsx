import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Form, FormData, Modal } from '../../../components';
import { useFetch, useModal } from '../../../hooks';
import { objectToKeyValue } from '../../../utils';
import { AppState } from '../../../store/reducers';

const UserForm: React.FC = (props): JSX.Element => {
  console.log('USER ADD', props);

  const { id = 0 } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();

  const { user } = useSelector((state: AppState) => state.session);
  const [form, setForm] = useState<FormData>();
  const [isShow, toggle] = useModal(true);

  const [{ status: submit, result: { data: dataSubmit } }, postUser] = useFetch('/api/setup/users');
  const [{ status: loading, result: { data: dataForm } }, getForm] = useFetch(`/api/setup/users/${id}${search}`);

  // load form
  useEffect(() => {
    void (async () => {
      await getForm();
    })();
  }, []);

  useEffect(() => {
    if (loading === 'success' && dataForm) {
      setForm(dataForm);
    }
  }, [loading]);

  useEffect(() => {
    if (submit == 'success') {
      console.log(dataSubmit);
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
    if (name == 'cancel') {
      navigate(-1);
    }
  };

  const handleModal = () => {

  }

  if (!form) {
    return <div>loading...</div>;
  }

  return (
    <>
      {submit === 'error' && <div>Error</div>}
      <Form form={form} isKey={true} status={submit} onSubmit={handleSubmit} onCallback={handleCallback} />
      <Modal show={isShow} onModal={handleModal} />
    </>
  );
};

export default UserForm;