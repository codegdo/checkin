import { useRef } from "react";
import { formValidator } from "../helpers";
import { FormResult } from "../types";

export interface FormStateProps {
  status?: string;
  callback?: (result: FormResult) => void
}

export const useFormState = ({ status, callback }: FormStateProps) => {
  const initialValues = useRef({});
  const formValues = useRef({});
  const formErrors = useRef({});
  const formTouched = useRef([]);
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
    status,
    onSubmit
  }
}