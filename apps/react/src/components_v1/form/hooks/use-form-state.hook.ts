import { useRef } from "react";
import { formValidator } from "../helpers";
import { FormFieldType, FormResult } from "../types";

export interface FormOptions {}

interface IProps {
  title?: string;
  data?: FormFieldType[];
  options?: FormOptions;
  status?: string;
  callback?: (result: FormResult) => void
}

export const useFormState = ({title, data = [], options, status, callback }: IProps) => {
  const ref = useRef({
    initialValues: {},
    values: {},
    errors: {},
    touched: {},
    validation: formValidator.object(),
  });

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
    onSubmit
  }
}