import { PropsWithChildren } from "react";
import { FieldType } from "./types";
import { FormField } from "./form.field";
import { ContextValue } from "./contexts";

type GroupProps = PropsWithChildren<FieldType & {
  context?: ContextValue
}>;

export function FormGroup({ data = [], children }: GroupProps) {
  return <div>
    {
      children || data?.map(field => {
        return <FormField key={field.id} {...field} />
      })
    }
  </div>
}