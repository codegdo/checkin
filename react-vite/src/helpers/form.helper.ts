//import Joi from 'joi';
import * as yup from 'yup';

//export type ObjectSchema = Joi.ObjectSchema<any>;
export type ObjectSchema = typeof yup.object & {
  validate: any;
  shape: any
};

export type ValidationError = yup.ValidationError;

class FormHelper {
  formSchema() {
    //return Joi.object();
    return yup.object();
  }

  fieldValidation(field: any) {
    let validation = null;

    if (field.type == 'number') {
      validation = this.validateNumber(field);
    } else {
      validation = this.validateString(field);
    }

    return validation;
  }

  private validateNumber({ type, isRequired }: any) {
    //let num = Joi.number();
    let num = yup.number();

    //num = isRequired ? num.required() : num.allow('');
    num = isRequired && num.required();

    return num;
  }

  private validateString({ type, name, isRequired }: any) {
    //let str = Joi.string();
    let str = yup.string();

    //str = isRequired ? str.required() : str.allow('');
    str = isRequired && str.required();

    if (type == 'email') {
      str = str.email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net'],
        },
      });
    } else if (type == 'password') {
      str = str.min(6).max(10);
    }

    return str;
  }
}

export const formHelper = new FormHelper();

/*
  joi.required().messages({
    'string.empty': `"${name}" cannot be an empty field`,
    'any.required': `"${name}" is a required field`,
  })

  https://medium.com/sliit-foss/the-joy-of-validating-with-joi-b8c87991975b
  https://medium.com/@andreassujono/top-10-tricky-javascript-questions-often-asked-by-interviewers-45c7dd90495e

  https://dev.to/hi_iam_chris/client-side-object-validation-with-yup-4f7a
*/
