import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';

import { useStyle } from '../../hooks';
import { Input } from '../input/input.component';
import { Element } from '../element/element.component';
import { FormContext } from '../../contexts/form.context';

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

export const Field: React.FC<Props> = ({ className = 'field', ...props }) => {
  const { values } = useContext(FormContext);
  const [fieldStyle, classNames] = useStyle(className);
  const isElement = ['button', 'link'].includes(props.type);

  useEffect(() => {

    if (!isElement) {
      values[props.name] = props.value;

      console.log('FIELD T', values);
    }

  }, []);

  return <View style={fieldStyle}>
    {
      isElement
        ? <Element {...props} className={classNames} />
        : <Input {...props} className={classNames} />
    }
  </View>
}