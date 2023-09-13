import { useWrapperContext } from "@/hooks";
import { Field } from "./types";

import FormContext from "./form.provider";

interface GridProps extends Field { }

export function FormGrid(props: GridProps) {
  const ctx = useWrapperContext(FormContext);
  return (
    <div>Grid</div>
  )
}