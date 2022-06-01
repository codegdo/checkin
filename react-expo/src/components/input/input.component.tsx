import React, { useContext } from 'react';
import { View, Text, TextInput } from 'react-native';

import { InputRender as render } from './input.render';
import { useStyle } from '../../hooks';

type Props = {
  id: string;
  type: string;
  name: string;
  value?: string;
  className?: string;
  title?: string;
  placeholder?: string;
}

export const Input: React.FC<Props> = ({ title, className = 'label : input', ...props }) => {
  const [labelStyle, classNames] = useStyle(className);

  return <>
    {
      title && <Text style={labelStyle}>{title}</Text>
    }
    {
      render({ ...props, className: classNames })
    }
  </>
}
