import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { NumPad } from '../../../components/numpad/numpad.component';
import { useAction, useFetch } from '../../../hooks';
import { storage } from '../../../services';
import { AppState } from '../../../store/reducers';

const Checkin: React.FC = (): JSX.Element => {
  const [{ loading, result }, fetchLogin] = useFetch('/api/auth/checkin');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { loggedIn, authKey } = useSelector((state: AppState) => state.session);
  const { deleteSession } = useAction();

  useEffect(() => {

    authKey && storage.setItem('auth_key', authKey);
    loggedIn && deleteSession();

    if (storage.getItem('auth_key')) {
      console.log('yes');
    } else {
      navigate('/auth/login');
    }

  }, []);

  useEffect(() => {
    if (loading === 'error') {
      setMessage(result.data.message);
    }
  }, [loading]);


  const handleSubmit = (value: any) => {
    void fetchLogin({ body: { passcode: value } });
  };

  return <NumPad type="phone" digit={10} placeholder="Enter Phone Number" message={message} loading={loading} onSubmit={handleSubmit} />;
};

export default Checkin;