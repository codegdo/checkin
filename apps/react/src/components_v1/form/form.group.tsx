import { PropsWithChildren } from "react";
import { FieldType } from "./types";
import { FormField } from "./form.field";
import { ContextValue } from "./contexts";

type GroupProps = PropsWithChildren<FieldType & {
  context?: ContextValue
}>;

export function FormGroup({ children, ...props }: GroupProps) {
  return <div>
    {
      children || props?.data?.map(field => {
        return <FormField key={field.id} {...field} group={{ ...props }} />
      })
    }
  </div>
}