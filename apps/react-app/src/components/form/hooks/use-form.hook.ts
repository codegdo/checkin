import { useCallback, useRef } from "react";
import { FormValues } from "../types";

interface UseFormParams {
  redirect?: string;
  onSubmit?: (data: FormValues) => void;
}

export function useForm({ onSubmit }: UseFormParams) {
  const valuesRef = useRef({});
  const errorsRef = useRef({});
  const eventsRef = useRef({});

  const handleClick = useCallback((name: string) => {
    console.log(name);
    onSubmit && onSubmit(valuesRef.current);
  }, []);

  return {
    values: valuesRef.current,
    errors: errorsRef.current,
    events: eventsRef.current,
    handleClick
  }
}