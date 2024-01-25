import { useEffect, useState } from "react";
import { Field } from "../field";
import { ContextValue } from "./contexts";
import { useFormContext } from "./hooks";
import { FieldType } from "./types";
import { ObjectShape, formValidator } from "./helpers";

type FormFieldProps = FieldType & {
  context?: ContextValue;
  group?: FieldType;
};

export function FormField({ context, ...props }: FormFieldProps) {
  const key = (props.id || props.name).toString();
  const stringValue = props.value?.toString().trim() || '';
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { ref } = (context || useFormContext()) as ContextValue;


  const handleChange = async (updatedValue: string) => {
    ref.values[key] = updatedValue.trim();
    ref.touched.add(key);
    ref.changed.add(key);
    console.log('CHANGE', ref, props);
  };

  const handleBlur = async () => {

  };

  const handleFocus = () => {
    ref.changed.clear();
    ref.touched.add(key);
    ref.changed.add(key);
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
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  );
}

/*

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
      ref.changed.add(key);
      return newValue;
    });

    console.log('CHANGE', ref, props);
  };

  const handleBlur = async () => {

    // if (key in ref.validation.fields) {
    //   const fields = ref.validation.fields as { [key: string]: ObjectSchema };
    //   await formValidator.validateSchema(fields[key], value);
    // }

    for (const changedKey of ref.changed) {
      if (changedKey in ref.validation.fields) {
        //const fields = ref.validation.fields as { [key: string]: ObjectSchema };
        //const valueToValidate = ref.values[changedKey]?.toString().trim() || '';

        const validationSchema = {
          schema: ref.validation, //fields[changedKey],
          value: ref.values,// valueToValidate
        }

        await formValidator.validateSchema(validationSchema);
      }
    }

    console.log('BLUR', ref);
  };

  const handleFocus = () => {
    ref.changed.clear();
    ref.touched.add(key);
    ref.changed.add(key);
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
