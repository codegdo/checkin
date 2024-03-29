import { useCallback, useEffect, useRef, useState } from "react";
import { FormContextValue } from "../form.provider";
import { FormField } from "../types";
import { formHelper } from "../helpers";

export const useField = (ctx: FormContextValue, field: FormField) => {
  const { values, errors, events, schema, form } = ctx;
  const { name, value } = field;

  const [currentValue, setCurrentValue] = useState(value ?? '');
  const [error, setError] = useState(false);
  const { current } = useRef({ schema });

  const handleChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCurrentValue(newValue);

    // Create a new object with the updated field value for validation
    const updatedValues = { ...values, [name]: newValue };

    console.log(updatedValues);

    try {
      await current.schema.validate(updatedValues, { abortEarly: false });
      setError(false);
    } catch (validateError) {
      console.log(validateError.inner);
      errors[name] = 'error';
      setError(true);
    }

  }, [current.schema, errors, name, values]);

  useEffect(() => {
    events[name] = {
      update: setCurrentValue,
      error: setError
    };

    current.schema = current.schema.shape({ [name]: formHelper.fieldValidation(field, events, values) });
    form.schema = form.schema.shape({ [name]: formHelper.fieldValidation(field, events, values) });
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