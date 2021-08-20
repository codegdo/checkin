import React, { useContext, useEffect } from 'react';
import { Input } from '../input';
import { Label } from '../element';
import { FormContext } from './form.component';
import { FieldProps } from './form.type';

export const FormField: React.FC<FieldProps> = ({ field, ...props }): JSX.Element => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('Require FIELD Nested In FORMCONTEXT');
  }

  const { values } = context;

  const data = field || props;
  const { label, description, type, name = '', value: initialValue, defaultValue = '' } = data;

  console.log('FIELD', data)

  useEffect(() => {
    values[name] = initialValue || defaultValue;
  }, [])

  const handleChange = (value?: string) => {
    values[name] = value;
  }

  return (
    <div>
      <Label label={label} description={description} />
      <Input
        type={type}
        value={initialValue || defaultValue}
        onChange={handleChange}
      />
    </div>
  )
}
