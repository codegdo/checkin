import React, { useEffect } from 'react';

import { useWrapperContext } from '../../hooks';
import { Label, Input } from '../input';

import { KeyValue } from '../input/input.type';
import { FormContext } from './form.context';
import { formHelper } from '../../helpers/form.helper';

interface FieldProps {
  id?: string | number;
  name: string;
  type: string;
  label?: string;
  description?: string;
  value?: string;
  isRequired?: boolean;
}

export const Field: React.FC<FieldProps> = (props): JSX.Element => {

  const { form, validation } = useWrapperContext(FormContext);
  const { type, name, label, description, value } = props;

  useEffect(() => {
    const fieldSchema = formHelper.fieldSchema(props);
    const schema = validation.schema.keys({ [name]: fieldSchema });

    form[name] = value;
    validation.schema = schema;
  }, []);

  const handleChange = ({ key, value }: KeyValue) => {
    form[key] = value;
    const { error } = validation.schema.validate({ [name]: value });
    console.log('hello', error);
  }

  return <div>
    <Label label={label} description={description} />
    <Input type={type} name={name} value={value} onChange={handleChange} />
  </div>
}