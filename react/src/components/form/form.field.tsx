import React, { useContext, useEffect, useState } from 'react';
import Joi from 'joi';

import { Input } from '../input';
import { Label } from '../element';
import { FormContext } from './form.component';
import { FieldProps } from './form.type';
import { formValidationSchema } from '../../helpers';

export const FormField: React.FC<FieldProps> = ({ field, ...props }): JSX.Element => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('Require FORMFIELD Nested In FORMCONTEXT');
  }

  const { values, errors, submit, formSchema } = context;

  const data = field || props;
  const { label, description, name = '', value: initialValue, defaultValue = '' } = data;
  const fieldSchema = formValidationSchema(data);

  console.log('FIELD', data);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    values[name] = initialValue || defaultValue;
    formSchema[name] = fieldSchema;
  }, []);

  useEffect(() => {
    setIsError(errors[name] ? true : false);
  }, [submit]);

  const handleChange = (value?: string) => {

    const { error } = Joi.object({ [name]: fieldSchema }).validate({ [name]: value });

    if (error) {
      errors[name] = error.details[0].message;
    } else {
      delete errors[name];
    }

    values[name] = value;

    setIsError(error ? true : false);
  }

  return (
    <div className={isError ? 'field -error' : 'field'}>
      <Label label={label} description={description} />
      <Input
        input={data}
        onChange={handleChange}
      />
    </div>
  )
}
