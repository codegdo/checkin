import { PropsWithChildren } from "react";
import { FormFieldType } from "./types";

type Props = PropsWithChildren<FormFieldType>;

export function FormSection({children}: Props) {
  return <div>{children}</div>
}