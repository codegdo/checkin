import { useWrapperContext } from "@/hooks";
import FormContext from "./form.provider";
import { Field } from "./types";

interface GroupProps extends Field { }

export function FormGroup(props: GroupProps) {
  const ctx = useWrapperContext(FormContext);
  return (
    <div>Group</div>
  )
}