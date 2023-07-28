import { useWrapperContext } from "@/hooks";
import { Field } from "./types";
import FormContext from "./form.provider";

interface ElementProps extends Field { }

export function FormElement(props: ElementProps) {
  const { handleClick } = useWrapperContext(FormContext);

  return (<div onClick={() => handleClick('click')}>Element</div>)
}