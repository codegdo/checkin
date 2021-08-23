import Joi from 'joi';

export const joiSchema = (data): any => {
  let schema: any = Joi;

  if (data.isRequired) {
    schema = schema.string().required();
  }

  if (data.type === 'email') {
    schema = Joi.string().email({ tlds: { allow: false } });
  }

  return schema.optional();
}