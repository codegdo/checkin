import { ContextValue } from "./contexts";
import { useFormContext } from "./hooks";
import { FormFieldType } from "./types";

type FieldProps = FormFieldType & {
  context?: ContextValue
};

export function FormField({context, ...props}: FieldProps) {
  const ctx = context || useFormContext();
  console.log(ctx);
  return (
    <>field</>
  )
}