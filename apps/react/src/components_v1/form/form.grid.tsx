import { ContextValue } from "./contexts";
import { FormFieldType } from "./types";

type GridProps = FormFieldType & {
  context?: ContextValue
};

export function FormGrid({context, ...props}: GridProps) {
  return (
    <>field</>
  )
}