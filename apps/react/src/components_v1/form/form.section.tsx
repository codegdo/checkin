import { PropsWithChildren } from "react";
import { FieldType } from "./types";
import { ContextValue } from "./contexts";

type SectionProps = PropsWithChildren<FieldType & {
  context?: ContextValue
}>;

export function FormSection({ children }: SectionProps) {
  return <div>{children}</div>
}