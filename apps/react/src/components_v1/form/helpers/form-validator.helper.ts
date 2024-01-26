import * as Yup from 'yup';

import { checkValidEmail } from '@/utils';
import { FieldType, FormValues } from '../types';

export type ObjectSchema = Yup.ObjectSchema<{
  [x: string]: unknown;
}, Yup.Maybe<Yup.AnyObject>, {
  [x: string]: undefined;
}, "">
export type ObjectShape = Yup.ObjectShape;

export interface ValidationForm {
  formSchema: ObjectSchema;
  values: FormValues,
  options?: Yup.ValidateOptions
}

export interface ValidationField {
  fieldSchema: ObjectSchema;
  values: FormValues;
}

class FormValidatorHelper {
  validator: typeof Yup

  constructor(yub: typeof Yup) {
    this.validator = yub;
  }

  createSchema(field: FieldType) {
    if (field.type === 'number') {
      let validateNumber = this.validator.number();

      if (field.required) {
        validateNumber = validateNumber.required();
      }

      return validateNumber;
    }

    if (field.type === 'text' || field.type === 'email') {
      let validateString = this.validator.string();

      if (field.required) {
        validateString = validateString.required();
      }

      if (field.type == 'email') {
        validateString = validateString.email().test("is-valid", (message) => `${message.path} is invalid`, (value) => checkValidEmail(value))
      }

      return validateString;
    }
  }

  async validateForm({ formSchema, values, options = { abortEarly: false } }: ValidationForm) {

    if (!formSchema) return;
    try {
      await formSchema.validate(values, options);
      return undefined;
    } catch (err) {
      const validationError = err as Yup.ValidationError;
      const errorsObject: { [key: string]: string } = {};

      if (validationError.inner) {
        validationError.inner.forEach((error) => {
          const path = error.path || '_error';
          errorsObject[path] = error.message;
        });
      }

      return errorsObject;
    }
  }

  async validateField({ fieldSchema, values }: ValidationField) {
    if (!fieldSchema) return;

    try {
      await fieldSchema.validate(values);
      return undefined;
    } catch (err) {
      const validationError = err as Yup.ValidationError;
      return validationError.errors[0] as string;
    }
  }
}

export const formValidator = new FormValidatorHelper(Yup);