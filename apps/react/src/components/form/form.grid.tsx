import { useWrapperContext } from "@/hooks";
import { FormField } from "./types";

import FormContext from "./form.provider";

interface GridProps extends FormField { }

export function FormGrid(props: GridProps) {
  const ctx = useWrapperContext(FormContext);
  return (
    <div>Grid</div>
  )
}