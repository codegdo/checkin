import React, { useRef } from 'react';
import { View } from 'react-native';

import { FormProvider } from '../../contexts/form.context';
import { useStyle } from '../../hooks';
import { FormRender } from './form.render';

type FormProps = {
  className?: string;
}

export const Form: React.FC<FormProps> = ({ className = 'form', children }) => {
  const [formStyle] = useStyle(className);
  const { current: values } = useRef({});

  return <View style={formStyle}>
    <FormProvider values={values}>
      {
        children ? children : <FormRender />
      }
    </FormProvider>
  </View>
}
