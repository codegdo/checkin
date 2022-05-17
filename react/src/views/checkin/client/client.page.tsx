import React, { useEffect, useState } from 'react';
import { NumPad } from '../../../components/numpad';
import { useFetch } from '../../../hooks';
import { sessionStore } from '../../../services';

const Client: React.FC = (): JSX.Element => {
  const [{ status, response }, fetchCheckin] = useFetch('/api/checkin/clients');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'error') {
      setMessage(response.data.message);
    }
    if (status === 'success') {
      setMessage('');
      console.log(response.data);
    }
  }, [status]);


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
    status={status}
    onSubmit={handleSubmit} />;
};

export default Client;