import { useWrapperContext } from "@/hooks";
import FormContext from "./form.provider";
import { FieldType } from "./types";
import { useEffect } from "react";

type FieldProps = FieldType;

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