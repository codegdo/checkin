import Joi from 'joi';

class FormHelper {
  formSchema() {
    return Joi.object();
  }

  fieldSchema(field: any) {
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

  private joiString({ type, isRequired }: any) {
    let joi = Joi.string();

    joi = isRequired ? joi.required() : joi.allow('');

    if (type == 'email') {
      joi = joi.email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net'],
        },
      });
    }

    return joi;
  }
}

export const formHelper = new FormHelper();
