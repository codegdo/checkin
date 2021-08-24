import React, { useContext, useEffect } from 'react';

import { Input } from '../input';
import { Label } from '../element';
import { FormContext } from './form.component';
import { FieldProps } from './form.type';
import { joiSchema } from '../../helpers';

export const FormField: React.FC<FieldProps> = ({ field, ...props }): JSX.Element => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('Require FORMFIELD Nested In FORMCONTEXT');
  }

  const { values, validateSchema } = context;

  const data = field || props;
  const { label, description, name = '', value: initialValue, defaultValue = '' } = data;
  const fieldValidateSchema = joiSchema(data);

  console.log('FIELD', data)

  useEffect(() => {
    values[name] = initialValue || defaultValue;
    validateSchema[name] = fieldValidateSchema;
  }, [])

  const handleChange = (value?: string) => {
    const { error } = fieldValidateSchema.validate(value);
    console.log(error);

    values[name] = value;
  }

  return (
    <div>
      <Label label={label} description={description} />
      <Input
        input={data}
        onChange={handleChange}
      />
    </div>
  )
}
