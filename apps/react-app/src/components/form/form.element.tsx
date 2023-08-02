import { ReactNode } from "react";
import { useWrapperContext } from "@/hooks";
import { CustomElementProps, Field } from "./types";
import FormContext from "./form.provider";

interface ElementProps extends Field {
  children?: ((props: CustomElementProps) => ReactNode) | ReactNode;
}

export function FormElement({ children, ...props }: ElementProps) {
  const { handleClick } = useWrapperContext(FormContext);

  // Check if props.children is a function before calling it
  const childElement = typeof children === 'function' ? children?.({ ...props, handleClick }) : children;

  return (<div>{childElement}</div>)
}