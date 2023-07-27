import { useRef } from "react";

export function useForm() {
  const formRef = useRef({});
  const errorRef = useRef({});

  return {
    values: formRef.current,
    errors: errorRef.current
  }
}