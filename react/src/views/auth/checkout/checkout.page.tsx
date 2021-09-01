import React, { useEffect } from 'react';
import { NumPad } from '../../../components/numpad/numpad.component';
import { useFetch } from '../../../hooks';

const Checkout: React.FC = (): JSX.Element => {
  const [{ loading, result }, fetchLogin] = useFetch('/api/auth/checkout');

  useEffect(() => {
    if (loading === 'success') {
      console.log(result);
    }
  }, [loading]);


  const handleSubmit = (value: any) => {
    void fetchLogin({ body: { passcode: value } });
  };

  return <NumPad type="passcode" loading={loading} reset={true} onSubmit={handleSubmit} />;
};

export default Checkout;