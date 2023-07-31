import { ReactNode, useEffect, useState } from "react";

import { useWrapperContext } from "@/hooks";

import FormContext from "./form.provider";
import { CustomFieldProps, Field } from "./types";


interface FieldProps extends Field {
  children?: ((props: CustomFieldProps) => ReactNode) | ReactNode;
}

export function FormField({ children, ...props }: FieldProps) {
  const { values, handleClick } = useWrapperContext(FormContext);
  const {name, value = ''} = props;

  const [val, setVal] = useState(value || '');

  // Check if props.children is a function before calling it
  const childElement = typeof children === 'function' ? children?.({...props, handleClick}) : children;

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
    values[name] = e.target.value;
  }

  useEffect(() => {
    values[name] = String(value);
    console.log(values);
  }, []);

  useEffect(() => {
    console.log(values);
  }, [handleChange]);

  return (
    <>
      {
        childElement || <div>
          <label></label>
          <input value={val} onChange={handleChange} />
        </div>
      }
    </>
  )
}