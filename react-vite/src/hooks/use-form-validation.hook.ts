import { useEffect, useRef, useState } from 'react';
import {
  validationHelper,
  ObjectValidationSchema,
  ValidationError,
} from '../helpers';

type FormValidationReturn = {
  isError: boolean;
  setValidation: (key: string, field: any) => void;
  fieldValidation: (key: string) => void;
  formValidation: () => Promise<void>;
  formReset: () => void;
};

type FormValidationConfig = {
  form: object;
  validation: ObjectValidationSchema;
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
    timerRef.current = setTimeout(async () => {
      const errors = await validationHelper.checkValidation(
        validation,
        form,
        key
      );

      let hasError = false;

      if (Object.keys(errors).length > 0) {
        if (errors[key]) {
          callbackError && callbackError(key, `${errors[key]}`);
          hasError = true;
        }
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
    const validationField = validationHelper.validationField(field);

    // validation.schema = validation.schema.keys({ [key]: fieldValidation });
    validation.schema = validation.schema.shape({ [key]: validationField });

    console.log(validation.schema);
  };

  const fieldValidation = (key: string) => {
    setTimer(key);
  };

  const formValidation = async () => {
    const errors = await validationHelper.checkValidation(validation, form);

    for (const [key, value] of Object.entries(errors)) {
      callbackError && callbackError(key, `${value}`);
    }
  };

  const formReset = () => {
    setError(false);
  };

  return { isError, setValidation, fieldValidation, formValidation, formReset };
};

/* let hasError = false;

      validation.schema
        .validate(form, { abortEarly: false })
        .then(() => setError(hasError))
        .catch((errors: ValidationError) => {
          errors.inner.forEach((error) => {
            //console.log(error.path, error.errors)
            if (error.path == key) {
              hasError = true;
              callbackError && callbackError(key, error.message);
              return;
            }
          });
          setError(hasError);
        });

      const { error }: ValidationError = validation.schema.validate(form, { abortEarly: false });

      if (error) {
        error.details.forEach(({ message, context }) => {
          if (context?.key == key) {
            hasError = true;
            callbackError && callbackError(key, message);
            return;
          }
        });
      }

      setError(hasError); */

/* validation.schema
      .validate(form, { abortEarly: false })
      .then(() => {})
      .catch((errors: ValidationError) => {
        errors.inner.forEach((error) => {
          //console.log(error.path, error.errors)
          const key = error.path;
          if (key) {
            callbackError && callbackError(key, error.message);
          }
        });
      });

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
    } */
