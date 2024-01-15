import { PropsWithChildren } from "react";
import { FormFieldType } from "./types";
import { ContextValue } from "./contexts";

type SectionProps = PropsWithChildren<FormFieldType & {
  context?: ContextValue
}>;

export function FormSection({children}: SectionProps) {
  return <div>{children}</div>
}