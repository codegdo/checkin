import { useWrapperContext } from "@/hooks";
import FormContext from "./form.provider";
import { FormField } from "./types";

interface GroupProps extends FormField { }

export function FormGroup(props: GroupProps) {
  const ctx = useWrapperContext(FormContext);
  return (
    <div>Group</div>
  )
}