import { useReducer, useRef } from "react";
import { formValidator } from "../helpers";
import { FieldType, FormResult, KeyValue } from "../types";
import { formReducer } from "../reducers";

export interface FormOptions { }

interface IProps {
  title?: string;
  data?: FieldType[] | null;
  options?: FormOptions;
  status?: string;
  callback?: (result: FormResult) => void
}

type ObjectValue = string | KeyValue[][] | Record<string, string>;

interface FormRef {
  initialValues: Record<string, ObjectValue>;
  values: Record<string, ObjectValue>;
  errors: Record<string, string | Record<string, string>>;
  touched: Set<string>;
  validation: ReturnType<typeof formValidator.object>
}

export const useFormState = ({ title, data = [], options, status, callback }: IProps) => {
  const ref = useRef<FormRef>({
    initialValues: {},
    values: {},
    errors: {},
    touched: new Set<string>(),
    validation: formValidator.object(),
  });

  const [state, dispatch] = useReducer(formReducer, {});

  const onSubmit = (type: string) => {
    const result: FormResult = {
      type,
      values: ref.current.values,
      isSubmit: type === 'submit',
    };

    callback && callback(result);
  };

  return {
    ref: ref.current,
    form: {
      title,
      data,
      options
    },
    status,
    state,
    dispatch,
    onSubmit
  }
}