import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { validationHelper } from '../../helpers';

import { useWrapperContext } from '../../hooks';
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
}

export function FormField({ id, type, name, label, description, value, isRequired }: FieldProps) {
  const { form = {}, error = {}, validation, options, isSubmit, isReset } = useWrapperContext(FormContext);
  const [isError, setIsError] = useState(false);
  const timerRef = useRef<number | null>(null);

  const key = useMemo(() => (options?.keyOption && options?.keyOption === 'id' && id) ? `${id}` : name, [options, id, name]);
  const schema = useMemo(() => validationHelper.fieldSchema({ type, isRequired }), [type, isRequired]);

  const validateField = useCallback(async () => {
    const errors = await validationHelper.checkValidation(validation, form, key);
    if (errors[key]) {
      error[key] = errors[key];
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [form, key, error, validation]);

  useMemo(() => {
    form[key] = value;
    validation.schema = validation.schema.shape({ [key]: schema });
  }, [form, key, schema, validation, value]);

  useEffect(() => {
    if (isReset) {
      form[key] = value;
      delete error[key];
      setIsError(false);
    }
  }, [isReset, form, key, value, error]);

  useEffect(() => {
    if (isSubmit) {
      validateField();
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isSubmit, validateField]);

  const errorMessage = useMemo(() => {
    if (isError) {
      const errorText = error[key]!;
      const errorKey = options?.keyOption === 'id' ? `${id ?? name}` : name;
      const fieldName = label ?? name;
      return errorText.replace(errorKey, fieldName);
    }
  }, [isError, error, key, options?.keyOption, id, name, label]);

  const handleChange = useCallback(({ value }: KeyValue) => {
    form[key] = value;
    delete error[key];
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(validateField, 0);
  }, [form, key, error, validateField]);

  return (
    <div className={isError ? 'error' : ''}>
      <Label label={label} description={description} />
      <Input type={type} name={name} value={form[key] ?? value} isReset={isReset} onChange={handleChange} />
      {isError && <span>{errorMessage}</span>}
    </div>
  );
}
