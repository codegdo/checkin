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

  const { values, errors, status, submit, formSchema, isKey, isMap } = context;

  const data = field || props;
  const { id, label, description, name, map = '', value: initialValue } = data;
  const mapTable = map?.split('.')[1];
  const fieldSchema = formValidationSchema(data);

  const key = (isKey ? id : name) || '';

  const [isError, setIsError] = useState(false);

  useEffect(() => {

    isMap ?
      values[mapTable] = { ...values[mapTable], [key]: initialValue } :
      values[key] = initialValue;

    formSchema[key] = fieldSchema;
  }, []);

  useEffect(() => {
    if (submit == 'submit') {
      setIsError(errors[key] ? true : false);
    }

  }, [submit]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

    const { error } = Joi.object({ [key]: fieldSchema }).validate({ [key]: event.target.value });

    if (error) {
      errors[key] = error.details[0].message;
    } else {
      delete errors[key];
    }

    isMap ?
      values[mapTable] = { ...values[mapTable], [key]: event.target.value } :
      values[key] = event.target.value;

    setIsError(error ? true : false);
  }

  return (
    <div className={isError ? 'field _error' : 'field'}>
      <Label label={label} description={description} />
      <Input
        input={data}
        status={status}
        onChange={handleChange}
      />
    </div>
  )
}
