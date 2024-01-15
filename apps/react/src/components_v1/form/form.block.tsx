import { PropsWithChildren } from "react";
import { FieldType } from "./types";
import { ContextValue } from "./contexts";

type BlockProps = PropsWithChildren<FieldType & {
  context?: ContextValue
}>;

export function FormBlock({ children }: BlockProps) {
  return <div>{children}</div>
}