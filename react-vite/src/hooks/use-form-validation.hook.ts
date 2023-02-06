import { useEffect, useRef, useState } from 'react';
import { formHelper, ObjectSchema } from '../helpers';

interface InputValue {
  [key: string]: any;
}

interface KeyValue {
  key: string;
  value: string;
}

type FormValidationReturn = {
  isError: boolean;
  setValidation: (key: string, field: any) => void;
  fieldValidation: (key: string) => void;
  formValidation: (hasErrors: boolean) => boolean;
  formReset: () => void;
};

type FormValidationConfig = {
  form: InputValue;
  validation: { [key: string]: ObjectSchema };
  delay?: number;
  callbackError?: (key: string, message: string) => void;
};

export const useFormValidation = ({
  form,
  validation,
  delay,
  callbackError,
}: FormValidationConfig): FormValidationReturn => {
  const [isError, setError] = useState(false);
  const timerRef = useRef<any>(null);

  const setTimer = (key: string) => {
    timerRef.current = setTimeout(() => {
      const { error } = validation.schema.validate(form, { abortEarly: false });
      let hasError = false;

      if (error) {
        error.details.forEach(({ message, context }) => {
          if (context?.key == key) {
            hasError = true;
            callbackError && callbackError(key, message);
            return;
          }
        });
      }

      setError(hasError);
    }, delay ?? 0);
  };

  useEffect(() => {
    return () => {
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, [isError]);

  const setValidation = (key: string, field: any) => {
    const fieldValidation = formHelper.fieldValidation(field);
    const schema = validation.schema.keys({ [key]: fieldValidation });

    validation.schema = schema;
  };

  const fieldValidation = (key: string) => {
    setTimer(key);
  };

  const formValidation = (hasErrors: boolean) => {
    let isValidated = false;

    if (hasErrors) {
      const { error } = validation.schema.validate(form, { abortEarly: false });

      if (error) {
        error.details.forEach(({ message, context }) => {
          const key = context?.key;

          if (key) {
            callbackError && callbackError(key, message);
          }
        });
      } else {
        isValidated = true;
      }
    }

    return isValidated;
  };

  const formReset = () => {
    setError(false);
  };

  return { isError, setValidation, fieldValidation, formValidation, formReset };
};
