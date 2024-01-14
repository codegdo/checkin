import { PropsWithChildren } from "react";
import { FormFieldType } from "./types";
import { FormField } from "./form.field";

type Props = PropsWithChildren<FormFieldType>;

export function FormGroup({data = [], children}: Props) {
  return <div>
    {
      children || data?.map(field => {
        return <FormField key={field.id} {...field} />
      })
    }
  </div>
}