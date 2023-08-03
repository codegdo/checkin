import { useCallback, useEffect, useRef, useState } from "react";
import { FormContextValue } from "../form.provider";
import { Field } from "../types";
import { formHelper } from "../helpers";

export const useField = (ctx: FormContextValue, field: Field) => {
  const { values, errors, events, schema, form } = ctx;
  const { name, value } = field;

  const [currentValue, setCurrentValue] = useState(value ?? '');
  const [error, setError] = useState(false);
  const { current } = useRef({ schema });

  const handleChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {

    setCurrentValue(e.target.value);

    try {
      await current.schema.validate(values);
      setError(false);
    } catch (validateError) {
      errors[name] = 'error';
      setError(true);
    }

  }, [current.schema, errors, name, values]);

  useEffect(() => {
    events[name] = {
      update: setCurrentValue,
      error: setError
    };

    current.schema = current.schema.shape({ [name]: formHelper.fieldValidation() });
    form.schema = form.schema.shape({ [name]: formHelper.fieldValidation() });
  }, []);

  useEffect(() => {
    values[name] = currentValue;
  }, [currentValue, name, values]);

  useEffect(() => {
    if (!error) {
      delete errors[name];
    }
  }, [error, errors, name]);

  return {
    currentValue,
    error,
    handleChange
  }

}