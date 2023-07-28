import { useWrapperContext } from "@/hooks";
import FormContext from "./form.provider";
import { Field } from "./types";
import { useEffect } from "react";

interface FieldProps extends Field {};

export function FormField({ name, value = '' }: FieldProps) {
  const { values } = useWrapperContext(FormContext);

  useEffect(() => {
    values[name] = String(value);
    console.log(values);
  }, []);

  return (
    <div>Field</div>
  )
}