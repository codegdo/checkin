import { useEffect, useReducer, useRef } from "react";
import { formValidator } from "../helpers";
import { FieldType, FormResult, FormValues } from "../types";
import { formReducer } from "../reducers";

export interface FormOptions { }

export interface FormProps {
  title?: string;
  data?: FieldType[];
  options?: FormOptions;
  status?: string;
  onSubmit?: (result: FormResult) => void
}

interface FormRef {
  initialValues: FormValues;
  values: FormValues;
  errors: Record<string, string | Record<string, string>>;
  changed: Set<string>;
  touched: Set<string>;
  validation: ReturnType<typeof formValidator.validator.object>
}

interface OnCallbackType {
  type: string;
  field?: FieldType;
}

export const useFormState = ({ data = [], options, status, onSubmit, ...props }: FormProps) => {
  const ref = useRef<FormRef>({
    initialValues: {},
    values: {},
    errors: {},
    changed: new Set<string>(),
    touched: new Set<string>(),
    validation: formValidator.validator.object(),
  });

  const [state, dispatch] = useReducer(formReducer, {});

  const onCallback = async ({ type, field }: OnCallbackType) => {
    const result: FormResult = {
      type,
      values: ref.current.values,
      field,
      isSubmit: type === 'submit',
    };

    return onSubmit && onSubmit(result);
  };

  useEffect(() => {
    console.log(status);
  }, [status]);

  return {
    ref: ref.current,
    source: {
      ...props,
      data,
      options
    },
    status,
    state,
    dispatch,
    onCallback
  }
}