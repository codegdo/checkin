//import Joi from 'joi';
import * as Yup from 'yup';

//export type ObjectSchema = Joi.ObjectSchema<any>;
export type ObjectSchema = Yup.ObjectSchema<Yup.AnyObject, {}>;

//export type ValidationError = Joi.ValidationError;
export type ValidationError = Yup.ValidationError;

export interface ObjectValidationSchema {
  schema: ObjectSchema;
}

interface KeyValue {
  [key: string]: string;
}

class ValidationHelper {
  objectSchema() {
    //return Joi.object();
    return Yup.object();
  }

  checkValidation(
    validation: ObjectValidationSchema,
    obj: object,
    key?: string
  ) {
    /* 
    let err: KeyValue = {};
    const { error } = validation.schema.validate(form, { abortEarly: false });
    
    if (error) {
      error.details.forEach(({ context, message }) => {
        const contextKey = context?.key;
        if (key) {
          // return one key
          if (contextKey == key) {
            err = { [`${key}`]: message };
            return;
          }
        } else {
          // return all keys
          if(contextKey) {
            err = { ...err, [`${contextKey}`]: message };
          }
        }
      });
    }

    return err; 
    */

    return validation.schema
      .validate(obj, { abortEarly: false })
      .then((): KeyValue => ({}))
      .catch((errors: ValidationError) => {
        let err: KeyValue = {};

        errors.inner.forEach(({ path, message }) => {
          if (key) {
            // return one key
            if (path == key) {
              err = { [`${key}`]: message };
              return;
            }
          } else {
            // return all keys
            err = { ...err, [`${path}`]: message };
          }
        });

        return err;
      });
  }

  validationField(field: any) {
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
    let num = Yup.number();

    //num = isRequired ? num.required() : num.allow('');
    num = isRequired && num.required();

    return num;
  }

  private validateString({ type, name, isRequired }: any) {
    //let str = Joi.string();
    let str = Yup.string();

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

export const validationHelper = new ValidationHelper();

/*
  joi.required().messages({
    'string.empty': `"${name}" cannot be an empty field`,
    'any.required': `"${name}" is a required field`,
  })

  https://medium.com/sliit-foss/the-joy-of-validating-with-joi-b8c87991975b
  https://medium.com/@andreassujono/top-10-tricky-javascript-questions-often-asked-by-interviewers-45c7dd90495e

  https://dev.to/hi_iam_chris/client-side-object-validation-with-yup-4f7a
*/
