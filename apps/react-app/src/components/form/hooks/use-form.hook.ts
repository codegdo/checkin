import { useCallback, useRef } from "react";
import { FormValues } from "../types";
import { objSchema } from '../helpers';

interface UseFormParams {
  redirect?: string;
  onSubmit?: (data: FormValues) => void;
}

export function useForm({ onSubmit }: UseFormParams) {
  const {current} = useRef({
    values: {},
    errors: {},
    events: {},
    vars: {},
    schema: objSchema
  });

  const handleClick = useCallback(async (name: string) => {
    console.log(name, current);
    onSubmit && onSubmit(current.values);
  }, [onSubmit]);

  return {
    values: current.values,
    errors: current.errors,
    events: current.events,
    vars: current.vars,
    validation: current,
    handleClick
  }
}