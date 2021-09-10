import React, { useEffect, useState } from 'react';
import { NumPad } from '../../../components/numpad/numpad.component';
import { useFetch } from '../../../hooks';
import { localStore } from '../../../services';

const Employee: React.FC = (): JSX.Element => {
  const [{ loading, result }, fetchCheckout] = useFetch('/api/checkout/employees');
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
    void fetchCheckout({
      headers: {
        'X-Api-Token': localStore.getItem('access_token')
      },
      params: { phone: value }
    });
  };

  return <NumPad type="passcode" loading={loading} reset={true} autoSubmit={true} onSubmit={handleSubmit} />;
};

export default Employee;