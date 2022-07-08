import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';

import { useStyle } from '../../hooks';
import { Input } from '../input/input.component';
import { Element } from '../element/element.component';
import { FormContext } from '../../contexts/form.context';
import { InputData } from '../input/input.type';
import { FieldProps } from './form.type';

export const Field: React.FC<FieldProps> = ({ className = 'form-field', ...props }) => {
  const { form, onSubmit } = useContext(FormContext);
  const [fieldStyle, classNames] = useStyle(className);
  const isElement = ['button', 'link', 'title'].includes(props.type);

  useEffect(() => {

    if (!isElement) {
      form[props.name] = (props.value == null || props.value == undefined ? '' : props.value);
    }

  }, []);

  const handleChange = (input: InputData) => {
    form[input.name] = input.text;
    console.log('FIELD CHANGE', form);
  }

  const handleClick = (name: string, value: string | undefined) => {
    onSubmit && onSubmit(name, value);
  }

  return <View style={fieldStyle}>
    {
      isElement
        ? <Element {...props} className={classNames} onClick={handleClick} />
        : <Input {...props} className={classNames} onChange={handleChange} />
    }
  </View>
}