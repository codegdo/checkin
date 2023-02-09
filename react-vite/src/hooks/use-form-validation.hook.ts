import { useEffect, useRef, useState } from 'react';
import { formHelper, ObjectSchema, ValidationError } from '../helpers';

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
      let hasError = false;

      validation.schema.validate(form, { abortEarly: false })
        .then(() => setError(hasError))
        .catch((errors: ValidationError) => {
          errors.inner.forEach(error => {
            //console.log(error.path, error.errors)
            if (error.path == key) {
              hasError = true;
              callbackError && callbackError(key, error.message);
              return;
            }
          });
          setError(hasError);
        });

      // const { error } = validation.schema.validate(form, { abortEarly: false });

      // if (error) {
      //   error.details.forEach(({ message, context }) => {
      //     if (context?.key == key) {
      //       hasError = true;
      //       callbackError && callbackError(key, message);
      //       return;
      //     }
      //   });
      // }

      //setError(hasError);
    }, delay ?? 0);
  };

  useEffect(() => {
    return () => {
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, [isError]);

  const setValidation = (key: string, field: any) => {
    const fieldValidation = formHelper.fieldValidation(field);

    // validation.schema = validation.schema.keys({ [key]: fieldValidation });
    validation.schema = validation.schema.shape({ [key]: fieldValidation });

    console.log(validation.schema);
  };

  const fieldValidation = (key: string) => {
    setTimer(key);
  };

  const formValidation = (hasErrors: boolean) => {
    let isValidated = false;

    if (hasErrors) {

      validation.schema.validate(form, { abortEarly: false })
        .then(() => isValidated = true)
        .catch((errors: ValidationError) => {
          errors.inner.forEach(error => {
            //console.log(error.path, error.errors)
            const key = error.path;
            if (key) {
              callbackError && callbackError(key, error.message);
            }
          });
        });

      // const { error } = validation.schema.validate(form, { abortEarly: false });

      // if (error) {
      //   error.details.forEach(({ message, context }) => {
      //     const key = context?.key;

      //     if (key) {
      //       callbackError && callbackError(key, message);
      //     }
      //   });
      // } else {
      //   isValidated = true;
      // }
    }

    return isValidated;
  };

  const formReset = () => {
    setError(false);
  };

  return { isError, setValidation, fieldValidation, formValidation, formReset };
};
