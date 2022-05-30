import React, { ReactNode, useContext } from 'react';
import { View, Text } from 'react-native';
import { FormProvider } from '../../contexts/form.context';

import { ThemeContext } from '../../contexts/theme.context';
import { cssStyle } from '../../utils';
import { FormRender } from './form.render';

type Props = {
  className?: string;
}

export const Form: React.FC<Props> = ({ className = 'form', children, ...props }) => {
  const { styles } = useContext(ThemeContext);
  const form = cssStyle(className, styles);

  return <View style={form}>
    <FormProvider>
      {
        children ? children : <FormRender />
      }
    </FormProvider>
  </View>
}
