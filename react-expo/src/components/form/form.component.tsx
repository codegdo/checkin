import React, { useCallback, useRef } from 'react';
import { View } from 'react-native';

import { FormProvider } from '../../contexts/form.context';
import { useStyle } from '../../hooks';
import { FormRender } from './form.render';
import { FormProps } from './form.type';

export const Form: React.FC<FormProps> = ({ className = 'form', onSubmit, children }) => {

  const [formStyle] = useStyle(className);
  const { current: form } = useRef({});
  const { current: error } = useRef({});

  const handleCallback = (key?: string, value?: string) => {
    console.log(form);
    console.log(key);
    onSubmit && onSubmit(form);
  };

  return <View style={formStyle}>
    <FormProvider form={form} error={error} callback={handleCallback}>
      {
        children ? children : <FormRender />
      }
    </FormProvider>
  </View>
}
