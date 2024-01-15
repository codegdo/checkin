import { ContextValue } from "./contexts";
import { FieldType } from "./types";

type GridProps = FieldType & {
  context?: ContextValue
};

export function FormGrid({ context, ...props }: GridProps) {
  return (
    <>field</>
  )
}