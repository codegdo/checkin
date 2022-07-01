import React, { useCallback, useRef } from 'react';
import { View } from 'react-native';

import { FormProvider } from '../../contexts/form.context';
import { useStyle } from '../../hooks';
import { FormRender } from './form.render';
import { FormProps } from './form.type';

export const Form: React.FC<FormProps> = ({ data, className = 'form', callback, children }) => {

  const [formStyle] = useStyle(className);
  const { current: form } = useRef({});
  const { current: error } = useRef({});

  const handleSubmit = (key?: string, value?: string) => {
    console.log(form);
    console.log(key);
    callback && callback(form);
  };

  return <View style={formStyle}>
    <FormProvider data={data} form={form} error={error} onSubmit={handleSubmit}>
      {
        children ? children : <FormRender />
      }
    </FormProvider>
  </View>
}
