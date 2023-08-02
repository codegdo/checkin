import { useCallback, useEffect, useState } from "react";
import { FormContextValue } from "../form.provider";
import { Field } from "../types";

export const useField = (ctx: FormContextValue, field: Field) => {
  const { values, events } = ctx;
  const { name, value } = field;

  const [currentValue, setCurrentValue] = useState(value ?? '');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    values[name] = e.target.value;
    setCurrentValue(e.target.value);
  }, [name, values]);

  const handleUpdate = useCallback((value: string) => {
    values[name] = value;
    setCurrentValue(value);
  }, [name, values]);

  useEffect(() => {
    values[name] = value ?? '';
    events[name] = {
      update: handleUpdate,
    };
  }, []);

  return {
    currentValue,
    handleChange
  }

}