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

  const { values, errors, submit, formSchema, isKey, isMap } = context;

  const data = field || props;
  const { id, label, description, name, mapto = '', value: initialValue, defaultValue = '' } = data;
  const mapTable = mapto.split('.')[1];
  const fieldSchema = formValidationSchema(data);

  const key = (isKey ? id : name) || '';

  const [isError, setIsError] = useState(false);

  useEffect(() => {

    isMap ?
      values[mapTable] = { ...values[mapTable], [key]: initialValue || defaultValue } :
      values[key] = initialValue || defaultValue;

    formSchema[key] = fieldSchema;
  }, []);

  useEffect(() => {
    setIsError(errors[key] ? true : false);
  }, [submit]);

  const handleChange = (value?: string) => {

    const { error } = Joi.object({ [key]: fieldSchema }).validate({ [key]: value });

    if (error) {
      errors[key] = error.details[0].message;
    } else {
      delete errors[key];
    }

    isMap ?
      values[mapTable] = { ...values[mapTable], [key]: value } :
      values[key] = value;

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
