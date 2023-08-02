import { useCallback, useEffect, useState } from "react";
import { FormContextValue } from "../form.provider";
import { Field } from "../types";
import { formHelper } from "../helpers";

export const useField = (ctx: FormContextValue, field: Field) => {
  const { values, events, schema, validation } = ctx;
  const { name, value } = field;

  const [currentValue, setCurrentValue] = useState(value ?? '');
  const [error, setError] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    //const fieldSchema = schema.shape({ [name]: formHelper.fieldSchema() });

    //console.log(fieldSchema);
    values[name] = val;
    setCurrentValue(val);
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
    validation.schema = validation.schema.shape({ [name]: formHelper.fieldSchema() });
  }, []);

  return {
    currentValue,
    error,
    handleChange
  }

}