import { useCallback, useEffect, useRef } from "react";
import { FormErrors, FormEvents, FormValues } from "../types";
import { ObjectSchemaExtend, ValidationError, formHelper, objSchema } from '../helpers';
import { error } from "console";

interface UseFormParams {
  redirect?: string;
  onSubmit?: (data: FormValues) => void;
}

interface FormRef {
  values: FormValues;
  errors: FormErrors;
  events: FormEvents;
  vars: object;
  schema: ObjectSchemaExtend;

}

export function useForm({ onSubmit }: UseFormParams) {
  const { current } = useRef<FormRef>({
    values: {},
    errors: {},
    events: {},
    vars: {},
    schema: objSchema
  });

  const handleClick = useCallback(async (name: string) => {
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
    //console.log(current);
  }, []);

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