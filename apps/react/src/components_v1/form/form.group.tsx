import { PropsWithChildren } from "react";
import { FormFieldType } from "./types";

type Props = PropsWithChildren<FormFieldType>;

export function FormGroup({data = [], children}: Props) {
  return <div>
    {
      children || data?.map(field => {
        return <div key={field.id}></div>
      })
    }
  </div>
}