import { PropsWithChildren } from "react";
import { DndField } from "./types";
import { ContextValue } from "./contexts";

type Props = PropsWithChildren<DndField & {
  context: ContextValue;
}>

export function DropSection({ children }: Props) {
  return <div>{children}</div>
}