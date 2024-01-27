import { useEffect, useReducer, useRef, useState } from "react";
import { formValidator } from "../helpers";
import { FieldType, FormSubmit, FormValues } from "../types";
import { formReducer } from "../reducers";

export interface FormOptions { }

export interface FormProps {
  title?: string;
  data?: FieldType[];
  options?: FormOptions;
  status?: string;
  onSubmit?: (formSubmit: FormSubmit) => void
}

interface FormRef {
  initialValues: FormValues;
  values: FormValues;
  errors: Record<string, string | Record<string, string>>;
  changed: Set<string>;
  touched: Set<string>;
  validation: ReturnType<typeof formValidator.validator.object>
}

interface CallbackData {
  type: string;
  field?: FieldType;
}

export const useFormState = ({ data = [], onSubmit, ...props }: FormProps) => {
  const ref = useRef<FormRef>({
    initialValues: {},
    values: {},
    errors: {},
    changed: new Set<string>(),
    touched: new Set<string>(),
    validation: formValidator.validator.object(),
  });

  const [errors, setErrors] = useState<{[key: string]: string} | undefined>();

  const onCallback = async ({ type, field }: CallbackData) => {
    let validationErrors = {...ref.current.errors};

    if(Object.keys(ref.current.errors).length === 0) {
      const errors = await formValidator.validateForm({
        formSchema:ref.current.validation, 
        values: ref.current.values
      });
    
      if(errors) {
        validationErrors = {...errors};
        setErrors(errors);
      }
    }

    const formSubmit: FormSubmit = {
      type,
      values: ref.current.values,
      validationErrors,
      hasError: Object.keys(validationErrors).length > 0,
      options: {
        eventTarget: field
      }
    };

    return onSubmit && onSubmit(formSubmit);
  };


  return {
    ...props,
    data,
    errors,
    ref: ref.current,
    onCallback
  }
}