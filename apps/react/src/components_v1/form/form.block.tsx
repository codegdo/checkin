import { PropsWithChildren } from "react";
import { ContextValue } from "./contexts";
import { FormFieldType } from "./types";

type Props = PropsWithChildren<FormFieldType & {
  context: ContextValue;
}>;

export function FormBlock({children}: Props) {
  return <div>{children}</div>
}