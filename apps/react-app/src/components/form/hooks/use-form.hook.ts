import { useRef } from "react";
import { FormProps } from "../form.component";

export interface FormValues {
  [key: string]: string;
}

export interface FormErrors {
  [key: string]: string;
}


export function useForm({ data = [] }: FormProps) {
  const formRef = useRef<FormValues>({});
  const errorRef = useRef<FormErrors>({});

  return {
    values: formRef.current,
    errors: errorRef.current,
    data
  }
}