import React, { useEffect, useState } from 'react';

import { useFormKey, useFormValidation, useWrapperContext } from '../../hooks';
import { Label, Input, KeyValue } from '../input';
import { FormContext } from './form.context';

export interface FieldProps {
  id?: string | number;
  name: string;
  type: string;
  label?: string;
  description?: string;
  className?: string;
  value?: string;
  isRequired?: boolean;
  [key: string]: any;
}

const Field: React.FC<FieldProps> = (props): JSX.Element => {

  const { id, type, name, label, description, value: initialValue } = props;
  const { form = {}, errors = {}, validation, options = {}, isSubmit, isReset } = useWrapperContext(FormContext);
  const key = useFormKey(options?.keyName, `${id}`, name);
  const { isError, setValidation, fieldValidation, formReset } = useFormValidation({ form, validation, callbackError });

  useEffect(() => {
    form[key] = initialValue ?? '';
    setValidation(key, props);
  }, [key]);

  useEffect(() => {
    isSubmit && fieldValidation(key);
  }, [isSubmit]);

  useEffect(() => {
    if (isReset) {
      form[key] = initialValue ?? '';
      delete errors[key];
      formReset();
    }
  }, [isReset]);

  useEffect(() => {
    console.log('ERROR', errors);
  }, [isError]);

  function callbackError(key: string, message: string) {
    errors[key] = message;
  }

  const handleChange = ({ value }: KeyValue) => {
    form[key] = value;
    delete errors[key];
    fieldValidation(key);
    console.log('WATCH', form);
  }

  return (
    <div className={isError ? 'error' : ''}>
      <Label label={label} description={description} />
      <Input type={type} name={name} value={initialValue} isReset={isReset} onChange={handleChange} />
      {
        isError && <span>{errors[key].replace((options.keyName === 'id' ? `${id}` : name), (label || name))}</span>
      }
    </div>
  );
}

export default Field;