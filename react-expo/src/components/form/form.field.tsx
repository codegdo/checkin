import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';

import { useStyle } from '../../hooks';
import { Input } from '../input/input.component';
import { Element } from '../element/element.component';
import { FormContext } from '../../contexts/form.context';
import { InputData } from '../input/input.type';

type Props = {
  id: string;
  type: string;
  name: string;
  className?: string;
  title?: string;
  value?: string;
  placeholder?: string;
  role?: string;
}

export const Field: React.FC<Props> = ({ className = 'form-field', ...props }) => {
  const { form, callback } = useContext(FormContext);
  const [fieldStyle, classNames] = useStyle(className);
  const isElement = ['button', 'link'].includes(props.type);

  useEffect(() => {

    if (!isElement) {
      form[props.name] = (props.value == null || props.value == undefined ? '' : props.value);
    }

  }, []);

  const handleChange = (input: InputData) => {
    form[input.name] = input.text;
    console.log('FIELD CHANGE', form);
  }

  return <View style={fieldStyle}>
    {
      isElement
        ? <Element {...props} className={classNames} onClick={callback} />
        : <Input {...props} className={classNames} onChange={handleChange} />
    }
  </View>
}