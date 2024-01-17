import { useEffect, useState } from "react";
import { Field } from "../field";
import { ContextValue } from "./contexts";
import { useFormContext } from "./hooks";
import { FieldType } from "./types";
import { ObjectSchema, ObjectShape, formValidator } from "./helpers";

type FormFieldProps = FieldType & {
  context?: ContextValue;
  hasParent?: boolean;
};

export function FormField({ context, ...props }: FormFieldProps) {
  const key = (props.id || props.name).toString();
  //const parentId = props.parentId?.toString() || '';
  const stringValue = props.value?.toString().trim() || '';
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { ref } = (context || useFormContext()) as ContextValue;
  const [value, setValue] = useState<string>(stringValue);

  const handleChange = async (updatedValue: string) => {
    const newValue = updatedValue.trim();

    setValue(() => {
      ref.values[key] = newValue;
      ref.touched.add(key);
      return newValue;
    });

    console.log('CHANGE', ref);
  };

  const handleBlur = async () => {
    if (key in ref.validation.fields) {
      const fields = ref.validation.fields as { [key: string]: ObjectSchema };
      await formValidator.validateSchema(fields[key], value);
    }
  };

  const handleFocus = () => {
    if (!ref.touched.has(key)) {
      ref.touched.add(key);
    }
  };

  useEffect(() => {

    ref.initialValues[key] = stringValue;
    ref.values[key] = stringValue;

    // Set up validation schema for the field
    ref.validation = ref.validation.shape({
      [key]: formValidator.createSchema(props),
    } as ObjectShape);

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
  );
}

/*
//(hasParent ? ref.values[parentId] as Record<string, string> : ref.values)[key] = newValue
if (hasParent) {
  ref.initialValues[parentId] = ref.initialValues[parentId] || {};
  ref.values[parentId] = ref.values[parentId] || {};

  (ref.initialValues[parentId] as Record<string, string>)[key] = stringValue;
  (ref.values[parentId] as Record<string, string>)[key] = stringValue;
} else {
  ref.initialValues[key] = stringValue;
  ref.values[key] = stringValue;
}
*/
