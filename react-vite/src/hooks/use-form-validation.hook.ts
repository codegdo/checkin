import Joi from 'joi';
import { useEffect, useState } from 'react';
import { formHelper } from '../helpers';

interface InputValue {
  [key: string]: any;
}

interface KeyValue {
  key: string;
  value: string;
}

export const useFormValidation = (
  form: InputValue,
  errors: InputValue,
  validation: { [key: string]: Joi.ObjectSchema<any> },
  delay?: number
): any => {
  const [isError, setError] = useState(false);
  const [keyValue, setKeyValue] = useState<KeyValue | null>(null);

  useEffect(() => {
    // use input keyValue that avoid first initial validation error if key is undefined
    const key = keyValue?.key;
    const timer = setTimeout(() => {
      const { error } = validation.schema.validate(form, { abortEarly: false });

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
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [keyValue, isError]);

  const setValidation = (field: any) => {
    const fieldValidation = formHelper.fieldValidation(field);
    const schema = validation.schema.keys({ [field?.name]: fieldValidation });

    validation.schema = schema;
  };

  const checkValidation = (input: KeyValue) => {
    delete errors[input?.key];
    setKeyValue({ ...input });
  };

  return [isError, setValidation, checkValidation];
};
