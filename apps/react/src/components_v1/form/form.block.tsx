import { PropsWithChildren } from "react";
import { FormFieldType } from "./types";
import { ContextValue } from "./contexts";

type BlockProps = PropsWithChildren<FormFieldType & {
  context?: ContextValue
}>;

export function FormBlock({children}: BlockProps) {
  return <div>{children}</div>
}