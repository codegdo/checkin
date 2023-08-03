import { useCallback, useEffect, useRef, useState } from "react";
import { FormContextValue } from "../form.provider";
import { Field } from "../types";
import { formHelper } from "../helpers";

export const useField = (ctx: FormContextValue, field: Field) => {
  const { values, events, schema, validation } = ctx;
  const { name, value } = field;

  const [currentValue, setCurrentValue] = useState(value ?? '');
  const [error, setError] = useState(false);
  let {current: fieldSchema} = useRef(schema);

  const handleChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    values[name] = val;
    setCurrentValue(val);

    try {
      await fieldSchema.validate(values);
      setError(false);
    } catch(validateError) {
      setError(true);
    }
    
  }, [name, values]);

  const handleUpdate = useCallback((value: string) => {
    values[name] = value;
    setCurrentValue(value);
  }, [name, values]);

  useEffect(() => {
    values[name] = value ?? '';
    events[name] = {
      update: handleUpdate,
      error: setError
    };
    fieldSchema = fieldSchema.shape({ [name]: formHelper.fieldSchema() });
    validation.schema = validation.schema.shape({ [name]: formHelper.fieldSchema() });
  }, []);

  return {
    currentValue,
    error,
    handleChange
  }

}