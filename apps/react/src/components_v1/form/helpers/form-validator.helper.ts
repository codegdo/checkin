import { FieldType } from '../types';
import * as Yup from 'yup';

export type YubObject = Yup.ObjectSchema<object, Yup.AnyObject, object, "">

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

      return validateString;
    }
  }

  object() {
    return this.validator.object();
  }
}

export const formValidator = new FormValidatorHelper(Yup);