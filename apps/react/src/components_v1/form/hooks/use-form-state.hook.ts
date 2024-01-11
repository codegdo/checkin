import { useRef } from "react";
import { formValidator } from "../helpers";
import { FormReturn } from "../types";

export interface FormStateProps {
  status?: string;
  callback?: (returnData: FormReturn) => void
}

export const useFormState = ({ status, callback }: FormStateProps) => {
  const initialValues = useRef({});
  const formValues = useRef({});
  const formErrors = useRef({});
  const formSchema = useRef(formValidator.object());

  const onSubmit = (type: string) => {
    switch (type) {
      case 'submit':
        callback && callback({
          type,
          formData: formValues.current,
          isSubmit: true
        });
        break;
    }
  }

  return {
    initialValues: initialValues.current,
    form: formValues.current,
    errors: formErrors.current,
    validation: formSchema.current,
    status,
    onSubmit
  }
}