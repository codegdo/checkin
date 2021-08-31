import React, { useEffect } from 'react';
import { NumPad } from '../../../components/numpad/numpad.component';
import { useFetch } from '../../../hooks';

const Checkin: React.FC = (): JSX.Element => {
  const [{ loading, result }, fetchLogin] = useFetch('/api/auth/checkin');

  useEffect(() => {
    if (loading === 'success') {
      console.log(result);
    }
  }, [loading]);


  const handleSubmit = (value: any) => {
    void fetchLogin({ body: { passcode: value } });
  };

  return <NumPad type="phone" digit={10} loading={loading} onSubmit={handleSubmit} />;
};

export default Checkin;