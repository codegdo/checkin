import { useWrapperContext } from "@/hooks";
import { CustomFieldProps, Field } from "./types";
import FormContext from "./form.provider";
import { ReactNode } from "react";

interface ElementProps extends Field {
  children?: ((props: CustomFieldProps) => ReactNode) | ReactNode;
}

export function FormElement({children, ...props}: ElementProps) {
  const { handleClick } = useWrapperContext(FormContext);

  // Check if props.children is a function before calling it
  const childElement = typeof children === 'function' ? children?.({...props, handleClick}) : children;


  return (<div onClick={() => handleClick('click')}>{childElement}</div>)
}