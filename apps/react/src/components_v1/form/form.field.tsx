import { useEffect, useState } from "react";
import { Field } from "../field";
import { ContextValue } from "./contexts";
import { useFormContext } from "./hooks";
import { FieldType } from "./types";
import { formValidator } from "./helpers";

type FieldProps = FieldType & {
  context?: ContextValue
};

export function FormField({ context, ...props }: FieldProps) {
  const key = (props.id || props.name).toString();
  const stringValue = props.value?.toString() || '';
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { ref } = (context || useFormContext()) as ContextValue;
  const [value, setValue] = useState(stringValue);

  const handleChange = (updatedValue: string) => {
    setValue(() => {
      ref.values[key] = updatedValue;
      if (!ref.touched.has(key)) {
        ref.touched.add(key);
      }
      return updatedValue;
    });
    console.log('CHANGE', ref);
  };

  const handleBlur = () => {
    //console.log('BLUR', key, value);
  }

  const handleFocus = () => {
    if (!ref.touched.has(key)) {
      ref.touched.add(key);
    }
  }

  useEffect(() => {
    ref.initialValues[key] = stringValue;
    ref.values[key] = stringValue;
    ref.validation.shape = {
      [key]: formValidator.create(props),
    };
    console.log(ref);
  }, []);

  return (
    <Field
      {...props}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  )
}