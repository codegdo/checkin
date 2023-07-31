import { ReactNode, useCallback, useEffect, useState } from "react";

import { useWrapperContext } from "@/hooks";

import FormContext from "./form.provider";
import { CustomFieldProps, Field } from "./types";


interface FieldProps extends Field {
  children?: ((props: CustomFieldProps) => ReactNode) | ReactNode;
}

export function FormField({ children, ...props }: FieldProps) {
  const { values, events } = useWrapperContext(FormContext);
  const { name, value = '' } = props;

  const [currentValue, setCurrentValue] = useState(value || '');
  const [callback, setCallback] = useState<{ name: string, value: string } | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    values[name] = e.target.value;
    setCurrentValue(e.target.value);
  }, [name, values]);

  const handleUpdate = useCallback((param: string) => {
    values[name] = param;
    setCurrentValue(param);
  }, [name, values]);

  const handleCallback = (param: { name: string, value: string }) => {
    setCallback(param);
  }

  useEffect(() => {
    values[name] = String(value);
    events[name] = {
      update: handleUpdate,
    };
  }, []);

  useEffect(() => {
    console.log(values);
    events['username']?.update(currentValue);
  }, [currentValue, values, events]);

  useEffect(() => {
    console.log('callback', callback);
  }, [callback]);

  // Check if props.children is a function before calling it
  const childElement = typeof children === 'function' ? children?.({ ...props, currentValue, events, handleChange, handleUpdate, handleCallback }) : children;

  return (
    <>
      {
        childElement || <div>
          <label htmlFor={name}>{name}</label>
          <input name={name} value={currentValue} onChange={handleChange} />
        </div>
      }
    </>
  )
}