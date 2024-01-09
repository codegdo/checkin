import { useRef } from "react";
import { formValidator } from "../helpers";

export interface FormData {
  type: string;
  formData: Record<string, string>;
  isSubmit: boolean;
}

export const useForm = (callback?: (formData: FormData) => void) => {
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
    onSubmit
  }
}