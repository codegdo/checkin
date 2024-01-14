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

export const useFormState = ({title, data = [], status, callback }: IProps) => {
  const initialValues = useRef({});
  const formValues = useRef({});
  const formErrors = useRef({});
  const formTouched = useRef<string[]>([]);
  const formSchema = useRef(formValidator.object());

  const onSubmit = (type: string) => {
    const result: FormResult = {
      type,
      values: formValues.current,
      isSubmit: type === 'submit',
    };

    callback && callback(result);
  };

  return {
    initialValues: initialValues.current,
    values: formValues.current,
    errors: formErrors.current,
    touched: formTouched.current,
    validation: formSchema.current,
    form: {
      title,
      data,
    },
    status,
    onSubmit
  }
}