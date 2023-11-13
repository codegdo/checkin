import { useCallback, useRef } from "react";
import { FormError, FormEvent, FormValue } from "../types";
import { ObjectSchemaExtend, ValidationError, formHelper, objSchema } from '../helpers';

interface UseFormParams {
  redirect?: string;
  onSubmit?: (data: FormValue) => void;
  onCallback?: (name: string) => void;
}

interface FormRef {
  values: FormValue;
  errors: FormError;
  events: FormEvent;
  vars: object;
  schema: ObjectSchemaExtend;

}

export function useForm({ onSubmit, onCallback }: UseFormParams) {
  const { current } = useRef<FormRef>({
    values: {},
    errors: {},
    events: {},
    vars: {},
    schema: objSchema
  });

  const handleClick = useCallback(async (name: string) => {

    if (name === 'submit') {
      try {
        await current.schema.validate(current.values, { abortEarly: false });
        onSubmit && onSubmit(current.values);
      } catch (validationError: unknown) {
        const errorArray = validationError as ValidationError;
        current.errors = formHelper.errorsWithFieldNames(errorArray);

        for (const fieldName in current.errors) {
          if (current.events[fieldName]) {
            current.events[fieldName].error(true);
          }
        }
      }
    } else {
      onCallback && onCallback(name);
    }

  }, [current, onSubmit, onCallback]);

  return {
    values: current.values,
    errors: current.errors,
    events: current.events,
    vars: current.vars,
    schema: current.schema,
    form: current,
    handleClick
  }
}