import Joi from 'joi';

export type ObjectSchema = Joi.ObjectSchema<any>;

class FormHelper {
  formSchema() {
    return Joi.object();
  }

  fieldValidation(field: any) {
    let joi = null;

    if (field.type == 'number') {
      joi = this.joiNumber(field);
    } else {
      joi = this.joiString(field);
    }

    return joi;
  }

  private joiNumber({ type, isRequired }: any) {
    let joi = Joi.number();

    joi = isRequired ? joi.required() : joi.allow('');

    return joi;
  }

  private joiString({ type, name, isRequired }: any) {
    let joi = Joi.string();

    joi = isRequired ? joi.required() : joi.allow('');

    if (type == 'email') {
      joi = joi.email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net'],
        },
      });
    } else if (type == 'password') {
      joi = joi.min(6).max(10);
    }

    return joi;
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
*/
