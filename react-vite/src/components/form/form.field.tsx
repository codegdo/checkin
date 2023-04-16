import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { validationHelper } from '../../helpers';

import { useWrapperContext } from '../../hooks';
import { Label, Input, KeyValue } from '../input';
import { FormContext } from './form.component';

export interface FieldProps {
  id?: string | number;
  name: string;
  type: string;
  label?: string;
  description?: string;
  note?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  defaultValue?: string;
  isRequired?: boolean;
}

export function FormField({
  id,
  type,
  name,
  label,
  description,
  value,
  defaultValue = "",
  isRequired,
}: FieldProps) {

  const {
    form = {},
    error = {},
    options = {},
    validation,
    isSubmit,
    isReload,
    isReset
  } = useWrapperContext(FormContext);

  const fieldValue = value ?? defaultValue;
  const fieldName = label ?? id ?? name;
  const fieldKey = (options?.mapKey === "id" && id) ? id : name;

  const [isError, setIsError] = useState(false);
  const timerRef = useRef<number | null>(null);

  const schema = useMemo(
    () => validationHelper.fieldSchema({ type, isRequired }),
    [type, isRequired]
  );

  const validateField = useCallback(async () => {
    const errors = await validationHelper.checkValidation(
      validation,
      form,
      `${fieldKey}`
    );

    if (errors[fieldKey]) {
      error[fieldKey] = errors[fieldKey].replace(`${fieldKey}`, `${fieldName}`);
      setIsError(true);
    } else {
      delete error[fieldKey];
      setIsError(false);
    }
  }, [form, error, validation, fieldKey, fieldName]);

  useEffect(() => {
    form[fieldKey] = fieldValue;
    validation.schema = validation.schema.shape({ [fieldKey]: schema });

    if (isReset) {
      delete error[fieldKey];
      setIsError(false);
    }
  }, [form, error, schema, validation, fieldKey, fieldValue, isReset]);

  useEffect(() => {
    if (isSubmit || isReload) {
      validateField();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isSubmit, isReload, validateField]);

  const handleChange = useCallback(
    ({ value }: { value: string }) => {
      form[fieldKey] = value;
      delete error[fieldKey];

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = window.setTimeout(validateField, 0);
    },
    [fieldKey, form, error, validateField]
  );

  return (
    <div className={isError ? "error" : ""}>
      <Label label={label} description={description} />
      <Input
        type={type}
        name={name}
        value={isReset ? fieldValue : form[fieldKey]}
        isReset={isReset}
        onChange={handleChange}
      />
      {isError && <span>{error[fieldKey]}</span>}
    </div>
  );
}

