import React from 'react';
import { Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { useStyle } from '../../hooks';
import { ElementButton } from './element.type';

export const Button: React.FC<ElementButton> = (props) => {
  const {
    name,
    value,
    title = 'Button',
    className = 'button.button-text',
    onClick } = props;

  const [buttonStyle, classNames] = useStyle(className);
  const [textStyle] = useStyle(classNames);

  return <TouchableHighlight underlayColor='rgba(0,0,0,.5)' style={buttonStyle} onPress={() => onClick && onClick(name, value)}>
    <Text style={textStyle}>{title}</Text>
  </TouchableHighlight>

}