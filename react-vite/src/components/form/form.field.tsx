import React, { useEffect } from 'react';
import Joi from 'joi';

import { useWrapperContext } from '../../hooks';
import { Label, Input } from '../input';

import { KeyValue } from '../input/input.type';
import { FormContext } from './form.context';

interface FieldProps {
  id?: string | number;
  name: string;
  type: string;
  label?: string;
  description?: string;
  value?: string;
}

export const Field: React.FC<FieldProps> = (props): JSX.Element => {

  const { form, schema } = useWrapperContext(FormContext);
  const { type, name, label, description, value } = props;

  useEffect(() => {
    form[name] = value;
    schema[name] = Joi.object({ [name]: Joi.string() });
  }, []);

  const handleChange = ({ key, value }: KeyValue) => {
    form[key] = value;
    const { error } = schema[name].validate({ [name]: value })
    console.log(error);
  }

  return <div>
    <Label label={label} description={description} />
    <Input type={type} name={name} value={value} onChange={handleChange} />
  </div>
}