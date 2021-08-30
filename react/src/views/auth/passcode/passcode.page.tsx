import React, { useState } from 'react';
import { NumPad } from '../../../components/numpad/numpad.component';

const Passcode: React.FC = (): JSX.Element => {
  const [value, setValue] = useState('');

  const handleSubmit = (values: any) => {
    console.log('SUBMIT VALUES', values);
    //void fetchLogin({ body: values });
    setValue(value => '');
  };

  return <NumPad value={value} onSubmit={handleSubmit} />;
};

export default Passcode;