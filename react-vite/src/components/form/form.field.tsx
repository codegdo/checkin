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
  note?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  defaultValue?: string;
  isRequired?: boolean;
}

export function FormField(props: FieldProps) {
  const {
    id,
    type,
    name,
    label,
    description,
    value,
    defaultValue = "",
    isRequired,
  } = props;

  const { form = {}, error = {}, validation, options, isSubmit, isReset } =
    useWrapperContext(FormContext);

  const initalValue = value ?? defaultValue;
  const [isError, setIsError] = useState(false);

  const timerRef = useRef<number | null>(null);
  const fieldName = label ?? id ?? name;

  const fieldKey = useMemo(() => {
    if (options?.keyOption === "id" && id) {
      return id;
    } else {
      return name;
    }
  }, [options, id, name]);

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
      error[fieldKey] = errors[fieldKey].replace(
        options?.keyOption === "id" ? `${id ?? name}` : name,
        `${fieldName}`
      );
      setIsError(true);
    } else {
      delete error[fieldKey];
      setIsError(false);
    }
  }, [form, error, validation, fieldKey, options?.keyOption, id, name, fieldName]);

  useEffect(() => {
    form[fieldKey] = initalValue;
    validation.schema = validation.schema.shape({ [fieldKey]: schema });

    if (isReset) {
      delete error[fieldKey];
      setIsError(false);
    }
  }, [form, fieldKey, schema, validation, initalValue, isReset, error]);

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

  const handleChange = useCallback(
    ({ value }: { value: string }) => {
      form[fieldKey] = value;
      delete error[fieldKey];

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = window.setTimeout(validateField, 0);
    },
    [form, fieldKey, error, validateField]
  );

  return (
    <div className={isError ? "error" : ""}>
      <Label label={label} description={description} />
      <Input
        type={type}
        name={name}
        value={isReset ? initalValue : form[fieldKey]}
        isReset={isReset}
        onChange={handleChange}
      />
      {isError && <span>{error[fieldKey]}</span>}
    </div>
  );
}

