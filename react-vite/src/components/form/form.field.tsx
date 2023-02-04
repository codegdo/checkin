import React, { useEffect, useState } from 'react';

import { useFormValidation, useWrapperContext } from '../../hooks';
import { Label, Input, KeyValue } from '../input';
import { formHelper } from '../../helpers';
import { FormContext } from './form.context';
import { FieldProps } from './form.type';

export const Field: React.FC<FieldProps> = (props): JSX.Element => {
  const { type, name, label, description, value: initialValue } = props;
  const { form, errors, validation } = useWrapperContext(FormContext);
  const [isError, checkValidation] = useFormValidation(form, errors, validation);

  useEffect(() => {
    const fieldValidation = formHelper.fieldValidation(props);
    const schema = validation.schema.keys({ [name]: fieldValidation });

    form[name] = initialValue;
    validation.schema = schema;
  }, []);

  useEffect(() => {
    console.log('DELAY', errors);
  }, [isError]);

  const handleChange = (input: KeyValue) => {
    delete errors[name];
    form[name] = input.value;
    checkValidation(input);
  }

  return <div className={isError ? 'error' : ''}>
    <Label label={label} description={description} />
    <Input type={type} name={name} value={initialValue} onChange={handleChange} />
  </div>
}