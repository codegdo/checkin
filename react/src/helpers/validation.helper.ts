import Joi from 'joi';
import { FieldData } from '../components/form';

export const formValidationSchema = (data: FieldData): any => {
  let schema: any = Joi;

  if (data.isRequired) {
    schema = schema.string().required();
  }

  if (data.type === 'email') {
    schema = Joi.string().email({ tlds: { allow: false } }).allow('');
  }

  return schema.optional();
}