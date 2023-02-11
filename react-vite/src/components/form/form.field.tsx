import React, { useEffect, useState } from 'react';

import { useFormValidation, useWrapperContext } from '../../hooks';
import { Label, Input, KeyValue } from '../input';
import { FormContext } from './form.context';
import { FieldProps } from './form.type';

export const Field: React.FC<FieldProps> = (props): JSX.Element => {
  const { id, type, name, label, description, value: initialValue } = props;
  const { form, errors, validation, options, isSubmit, isReset } = useWrapperContext(FormContext);
  const { key } = options;
  let keyname = (id || name).toString();

  if (key && props.hasOwnProperty(key)) {
    keyname = (key === 'id' || key === 'name') ? props[key as string] : keyname;
  }

  const { isError, setValidation, fieldValidation, formReset } = useFormValidation({ form, validation, callbackError });

  useEffect(() => {
    form[keyname] = initialValue ?? '';
    setValidation(keyname, props);
  }, []);

  useEffect(() => {
    isSubmit && fieldValidation(keyname);
  }, [isSubmit]);

  useEffect(() => {
    if (isReset) {
      form[keyname] = initialValue ?? '';
      delete errors[keyname];
      formReset();
    }
  }, [isReset]);

  useEffect(() => {
    console.log('ERROR', errors);
  }, [isError]);

  function callbackError(keyname: string, message: string) {
    if (keyname) {
      errors[keyname] = message;
    }
  }

  const handleChange = ({ value }: KeyValue) => {
    form[keyname] = value;
    delete errors[keyname];
    fieldValidation(keyname);
    console.log('WATCH', form);
  }

  return <div className={isError ? 'error' : ''}>
    <Label label={label} description={description} />
    <Input type={type} name={name} value={initialValue} isReset={isReset} onChange={handleChange} />
    {
      isError && <span>{errors[name]}</span>
    }
  </div>
}