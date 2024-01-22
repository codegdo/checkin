import { useReducer, useRef } from "react";
import { formValidator } from "../helpers";
import { FieldType, FormResult, FormValues } from "../types";
import { formReducer } from "../reducers";

export interface FormOptions { }

interface IProps {
  title?: string;
  data?: FieldType[] | null;
  options?: FormOptions;
  status?: string;
  loading?: boolean;
  callback?: (result: FormResult) => void
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

export const useFormState = ({ title, data = [], options, status, loading, callback }: IProps) => {
  const ref = useRef<FormRef>({
    initialValues: {},
    values: {},
    errors: {},
    changed: new Set<string>(),
    touched: new Set<string>(),
    validation: formValidator.validator.object(),
  });

  const [state, dispatch] = useReducer(formReducer, {});

  const onCallback = async ({type, field}:OnCallbackType) => {
    const result: FormResult = {
      type,
      values: ref.current.values,
      field,
      isSubmit: type === 'submit',
    };

    return callback && callback(result);
  };

  return {
    ref: ref.current,
    form: {
      title,
      data,
      options
    },
    status,
    loading,
    state,
    dispatch,
    onCallback
  }
}