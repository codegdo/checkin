import React, { useEffect, useState } from 'react';

import { useFormValidation, useWrapperContext } from '../../hooks';
import { Label, Input, KeyValue } from '../input';
import { FormContext } from './form.context';
import { FieldProps } from './form.type';

export const Field: React.FC<FieldProps> = (props): JSX.Element => {
  const { id, type, name, label, description, value: initialValue } = props;
  const { form, errors, validation, options, isSubmit, isReset } = useWrapperContext(FormContext);
  const { key = id || name } = options;
  const { isError, setValidation, fieldValidation, formReset } = useFormValidation({ form, validation, callbackError });

  useEffect(() => {
    form[key] = initialValue ?? '';
    setValidation(key as string, props);
  }, []);

  useEffect(() => {
    isSubmit && fieldValidation(key as string);
  }, [isSubmit]);

  useEffect(() => {
    if (isReset) {
      form[key] = initialValue ?? '';
      delete errors[key];
      formReset();
    }
  }, [isReset]);

  useEffect(() => {
    console.log('DELAY', errors);
  }, [isError]);

  function callbackError(key: string, message: string) {
    errors[key] = message;
  }

  const handleChange = ({ value }: KeyValue) => {
    form[key] = value;
    delete errors[key];
    fieldValidation(key as string);
  }

  return <div className={isError ? 'error' : ''}>
    <Label label={label} description={description} />
    <Input type={type} name={name} value={initialValue} isReset={isReset} onChange={handleChange} />
    {
      isError && <span>{errors[name]}</span>
    }
  </div>
}