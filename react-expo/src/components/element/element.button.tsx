import React, { ReactNode } from 'react';
import { Text, TouchableOpacity } from 'react-native';

type Props = {
  name: string;
  type: string;
  value?: string;
  title?: string;
  className?: string;
  callback?: () => void;
}

export const Button: React.FC<Props> = (props) => {
  const {
    name,
    type,
    value,
    title = 'Button',
    className = 'button',
    callback } = props;

  const handlePress = (key: string, val: string | undefined) => {
    callback && callback();
  };

  return <TouchableOpacity onPress={() => handlePress(name, value)}>
    <Text>{title}</Text>
  </TouchableOpacity>

}