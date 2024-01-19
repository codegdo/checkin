import * as Yup from 'yup';

import { checkValidEmail } from '@/utils';
import { FieldType, FormValues } from '../types';

export type ObjectSchema = Yup.ObjectSchema<object, Yup.AnyObject, object, "">
export type ObjectShape = Yup.ObjectShape;
export interface ValidationSchema {
  schema: ObjectSchema;
  value: string | number | null | FormValues,
  options?: Yup.ValidateOptions
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

  async validateSchema({ schema, value, options = { abortEarly: false } }: ValidationSchema) {
    try {
      return await schema.validate(value, options);
    } catch (err) {
      const validationError = err as Yup.ValidationError;
      console.log(validationError.inner);
    }
  }

  object() {
    return this.validator.object();
  }
}

export const formValidator = new FormValidatorHelper(Yup);