import Joi from 'joi';
import { FieldData } from '../components/form';

export const formValidationSchema = ({ isRequired, type }: FieldData): any => {
  let schema: any = (type == 'number') ? Joi.number() : Joi.string();

  switch (type) {
    case 'email':
      schema = schema.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } });
      break;
  }

  schema = isRequired ? schema.required() : schema.allow('');

  return schema;
}