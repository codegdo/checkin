import React, { useEffect, useState } from 'react';
import { NumPad } from '../../../components/numpad';
import { useFetch } from '../../../hooks';
import { sessionStore } from '../../../services';

const Employee: React.FC = (): JSX.Element => {
  const [{ status, result }, fetchCheckout] = useFetch('/api/checkout/employees');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'error') {
      setMessage(result.data.message);
    }
    if (status === 'success') {
      setMessage('');
      console.log(result.data);
    }
  }, [status]);


  const handleSubmit = (value: any) => {
    void fetchCheckout({
      headers: {
        'X-Api-Token': sessionStore.getItem('access_token')
      },
      params: { phone: value }
    });
  };

  return <NumPad type="passcode" status={status} reset={true} autoSubmit={true} onSubmit={handleSubmit} />;
};

export default Employee;