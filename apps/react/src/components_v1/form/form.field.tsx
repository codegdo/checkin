import { useEffect, useRef, useState } from "react";
import { Field } from "../field";
import { ContextValue } from "./contexts";
import { useFormContext } from "./hooks";
import { FieldType } from "./types";
import { ObjectSchema, ObjectShape, formValidator } from "./helpers";

type FormFieldProps = FieldType & {
  context?: ContextValue;
  group?: FieldType;
};

interface FieldRef {
  validation: ObjectSchema;
}

export function FormField({ context, ...props }: FormFieldProps) {
  const key = (props.id || props.name).toString();
  const stringValue = props.value?.toString().trim() || '';
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { ref, errors } = (context || useFormContext()) as ContextValue;
  const { current } = useRef<FieldRef>({ validation: formValidator.validator.object() });
  const [error, setError] = useState<string>();

  const handleChange = async (updatedValue: string) => {
    ref.values[key] = updatedValue.trim();
    ref.touched.add(key);
    ref.changed.add(key);
    console.log('CHANGE', ref, props);
  };

  const handleBlur = async () => {
    for (const changedKey of ref.changed) {
      if (changedKey in ref.validation.fields) {
        const valueToValidate = ref.values[changedKey]?.toString().trim() || '';

        const validationSchema = {
          fieldSchema: current.validation,
          values: { [changedKey]: valueToValidate }
        }

        const err = await formValidator.validateField(validationSchema);

        setError(err);

      }
    }
    console.log('BLUR', ref);
  };

  const handleFocus = () => {
    ref.changed.clear();
    ref.touched.add(key);
    ref.changed.add(key);
};

  const handleClick = (type:string) => {
    context?.onClick?.({type, eventTarget: props});
  }

  useEffect(() => {
    if(props.parentId !== undefined) {
      ref.initialValues[key] = stringValue;
      ref.values[key] = stringValue;

      const fieldSchema = formValidator.createSchema(props);

      // Set up validation schema for form
      ref.validation = ref.validation.shape({
        [key]: fieldSchema,
      } as ObjectShape);

      // Set up validation schema for field
      current.validation = current.validation.shape({
        [key]: fieldSchema,
      } as ObjectShape);
    }
    console.log(ref);
  }, []);

  useEffect(() => {
    if(errors && key in errors) {
      setError(errors[key]);
    }
  }, [errors]);

  useEffect(() => {
    if(error) {
      ref.errors[key] = error;
    } else {
      delete ref.errors[key];
    }
  }, [error]);

  return (
    <Field
      {...props}
      error={error}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onClick={handleClick}
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
