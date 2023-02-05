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
  setValidation: () => void;
  fieldValidation: () => void;
  formValidation: () => boolean;
  formReset: () => void;
};

type FormValidationConfig = {
  field: any;
  form: InputValue;
  errors: InputValue;
  validation: { [key: string]: ObjectSchema };
  delay?: number;
};

export const useFormValidation = ({
  field,
  form,
  errors,
  validation,
  delay,
}: FormValidationConfig): FormValidationReturn => {
  const [isError, setError] = useState(false);
  const timerRef = useRef<any>(null);

  const setTimer = () => {
    timerRef.current = setTimeout(() => {
      const { error } = validation.schema.validate(form, { abortEarly: false });
      const key = field?.name;

      if (error) {
        error.details.forEach(({ message, context }) => {
          if (context?.key == key) {
            if (key) {
              errors[key] = message;
            }
            return;
          }
        });
      }

      if (key) {
        setError(errors[key] ? true : false);
      }
    }, delay ?? 500);
  };

  useEffect(() => {
    return () => {
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, [isError]);

  const setValidation = () => {
    const fieldValidation = formHelper.fieldValidation(field);
    const schema = validation.schema.keys({ [field?.name]: fieldValidation });

    validation.schema = schema;
  };

  const fieldValidation = () => {
    field && delete errors[field.name];
    setTimer();
  };

  const formValidation = () => {
    const hasErrors = Object.keys(errors).length === 0;
    let isValidated = false;

    if (hasErrors) {
      const { error } = validation.schema.validate(form, { abortEarly: false });

      if (error) {
        error.details.forEach(({ message, context }) => {
          const key = context?.key;

          if (key) {
            errors[key] = message;
          }
        });
      } else {
        isValidated = true;
      }
    }

    return isValidated;
  };

  const formReset = () => {
    field && delete errors[field.name];
    setError(false);
  };

  return { isError, setValidation, fieldValidation, formValidation, formReset };
};
