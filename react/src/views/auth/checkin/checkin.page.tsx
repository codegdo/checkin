import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NumPad } from '../../../components/numpad/numpad.component';
import { useAction, useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';

const Checkin: React.FC = (): JSX.Element => {
  const [{ loading, result }, fetchLogin] = useFetch('/api/auth/checkin');
  const [message, setMessage] = useState('');

  const { loggedIn, apikey } = useSelector((state: AppState) => state.session);
  const { deleteSession } = useAction();

  useEffect(() => {
    apikey && localStorage.setItem('api_key', apikey);
    loggedIn && deleteSession();
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