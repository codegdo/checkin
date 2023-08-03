import { ReactNode } from "react";

import { useWrapperContext } from "@/hooks";

import FormContext from "./form.provider";
import { CustomFieldProps, Field } from "./types";
import { useField } from "./hooks/use-field.hook";


interface FieldProps extends Field {
  children?: ((props: CustomFieldProps) => ReactNode) | ReactNode;
}

export function FormField({ children, ...props }: FieldProps) {
  const ctx = useWrapperContext(FormContext);
  const { currentValue, error, handleChange } = useField(ctx, props)
  const { name } = props;
  //
  const childElement = typeof children === 'function' ? children?.({ ...props, currentValue, error, handleChange }) : children;

  return (
    <>
      {
        childElement || <div>
          <label htmlFor={name}>{name}</label>
          <input name={name} value={currentValue} onChange={handleChange} />
          {error && <p>{ctx.errors[name] || 'error'}</p>}
        </div>
      }
    </>
  )
}