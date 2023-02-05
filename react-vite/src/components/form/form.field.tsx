import React, { useEffect, useState } from 'react';

import { useFormValidation, useWrapperContext } from '../../hooks';
import { Label, Input, KeyValue } from '../input';
import { FormContext } from './form.context';
import { FieldProps } from './form.type';

export const Field: React.FC<FieldProps> = (props): JSX.Element => {
  const { type, name, label, description, value: initialValue } = props;
  const { form, errors, validation, isSubmitting } = useWrapperContext(FormContext);
  const { isError, setValidation, fieldValidation } = useFormValidation(props, form, errors, validation);

  useEffect(() => {
    form[name] = initialValue;
    setValidation();
  }, []);

  useEffect(() => {
    isSubmitting && fieldValidation();
  }, [isSubmitting]);

  useEffect(() => {
    console.log('DELAY', errors);
  }, [isError]);

  const handleChange = ({ value }: KeyValue) => {
    form[name] = value;
    fieldValidation();
  }

  return <div className={isError ? 'error' : ''}>
    <Label label={label} description={description} />
    <Input type={type} name={name} value={initialValue} onChange={handleChange} />
    {
      isError && <span>{errors[name]}</span>
    }
  </div>
}