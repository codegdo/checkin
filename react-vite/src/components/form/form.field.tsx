import React, { useEffect, useState } from 'react';

import { useWrapperContext } from '../../hooks';
import { Label, Input, KeyValue } from '../input';
import { formHelper } from '../../helpers';
import { FormContext } from './form.context';
import { FieldProps } from './form.type';

export const Field: React.FC<FieldProps> = (props): JSX.Element => {

  const { form, errors, validation, isSubmitting } = useWrapperContext(FormContext);
  const { type, name, label, description, value: initialValue } = props;

  const [isError, setError] = useState(false);

  useEffect(() => {
    const fieldValidation = formHelper.fieldValidation(props);
    const schema = validation.schema.keys({ [name]: fieldValidation });

    form[name] = initialValue;
    validation.schema = schema;
  }, []);

  const handleChange = (input: KeyValue) => {
    form[name] = input.value;

    delete errors[name];

    const { error } = validation.schema.validate(form, { abortEarly: false });

    if (error) {
      error.details.forEach(({ message, context }) => {
        if (context?.key == name) {
          errors[name] = message;
          return;
        }
      });
    }

    setError(errors[name] ? true : false)
  }

  return <div className={isError ? 'error' : ''}>
    <Label label={label} description={description} />
    <Input type={type} name={name} value={initialValue} onChange={handleChange} />
  </div>
}