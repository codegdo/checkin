import Joi from 'joi';
import { useEffect, useState } from 'react';

interface InputValue {
  [key: string]: any;
}

export const useFormValidation = (
  form: InputValue,
  errors: InputValue,
  validation: { [key: string]: Joi.ObjectSchema<any> },
  delay?: number
): any => {
  const [isError, setError] = useState(false);
  const [value, setValue] = useState<InputValue>({});

  useEffect(() => {
    const key = value?.key;
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
  }, [value, isError]);

  const checkValidation = (input: InputValue) => {
    setValue({ ...input });
  };

  return [isError, checkValidation];
};
