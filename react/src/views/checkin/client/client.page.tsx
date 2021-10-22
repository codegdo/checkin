import React, { useEffect, useState } from 'react';
import { NumPad } from '../../../components/numpad';
import { useFetch } from '../../../hooks';
import { sessionStore } from '../../../services';

const Client: React.FC = (): JSX.Element => {
  const [{ loading, result }, fetchCheckin] = useFetch('/api/checkin/clients');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (loading === 'error') {
      setMessage(result.data.message);
    }
    if (loading === 'success') {
      setMessage('');
      console.log(result.data);
    }
  }, [loading]);


  const handleSubmit = (value: any) => {
    void fetchCheckin({
      headers: {
        'X-Api-Token': sessionStore.getItem('access_token')
      },
      params: {
        phone: value,
        location: 1
      }
    });
  };

  return <NumPad
    type="phone"
    digit={10}
    placeholder="Enter Phone Number"
    message={message}
    loading={loading}
    onSubmit={handleSubmit} />;
};

export default Client;