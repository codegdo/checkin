import React, { useEffect, useState } from 'react';
import { } from 'react-native';

import * as data from './login.json';
import { Form } from '../../../components';

export const Login: React.FC = () => {
  const [form, setForm] = useState<any>();

  // load form
  useEffect(() => {
    setForm(data);
  }, []);

  return <>
    <Form />
  </>
}