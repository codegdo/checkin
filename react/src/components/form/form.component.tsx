import React, { useCallback, useRef } from 'react';
import Joi from 'joi';

import { normalizeForm } from '../../helpers';

import { FormRender as render } from './form.render';
import { FormContextProps, FormProps } from './form.type';

export const FormContext = React.createContext<FormContextProps>(undefined);

export const Form: React.FC<FormProps> = ({ form, onSubmit, children, ...props }): JSX.Element => {


  const data = form && normalizeForm(form) || props;
  const { current: values } = useRef({});
  const { current: validateSchema } = useRef({});

  const handleSubmit = useCallback((name: string) => {
    if (name === 'submit') {
      const { error, value } = Joi.object(validateSchema).validate(values, { abortEarly: false });

      console.log(error);
      console.log(value);

      if (!error) {
        onSubmit && onSubmit(values);
      }

    }
  }, []);

  return (
    <form>
      <FormContext.Provider value={{ data, values, validateSchema, handleSubmit }}>
        {
          children || render({ data })
        }
      </FormContext.Provider>
    </form>
  )
}


