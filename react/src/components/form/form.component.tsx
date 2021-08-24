import React, { useCallback, useEffect, useRef, useState } from 'react';
import Joi from 'joi';

import { normalizeForm } from '../../helpers';

import { FormRender as render } from './form.render';
import { FormContextProps, FormProps } from './form.type';

export const FormContext = React.createContext<FormContextProps>(undefined);

export const Form: React.FC<FormProps> = ({ form, status, onSubmit, children, ...props }): JSX.Element => {

  const data = form && normalizeForm(form) || props;
  const { current: values } = useRef({});
  const { current: errors } = useRef({});
  const { current: formSchema } = useRef({});

  const [submit, setSubmit] = useState<string | undefined>();

  useEffect(() => {

    if (submit === 'submit') {
      const { error } = Joi.object(formSchema).validate(values, { abortEarly: false });

      if (error) {
        error.details.forEach(e => {
          const key = e.context?.key;
          const message = e.message;

          if (key) {
            errors[key] = message;
          }
        });
      }

      if (Object.keys(errors).length === 0) {
        onSubmit && onSubmit(values);
      }
    }
    console.log(status);
    return () => setSubmit(undefined);
  }, [submit]);

  const handleSubmit = useCallback((name: string) => {
    setSubmit(name)
  }, []);

  return (
    <form>
      <FormContext.Provider value={{ data, values, errors, status, submit, formSchema, handleSubmit }}>
        {
          children || render({ data })
        }
      </FormContext.Provider>
    </form>
  )
}


