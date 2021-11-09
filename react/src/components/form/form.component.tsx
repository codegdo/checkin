import React, { useCallback, useEffect, useRef, useState } from 'react';
import Joi from 'joi';

import { FormRender as render } from './form.render';
import { FormContextProps, FormProps } from './form.type';
import { setDetailsToErrors } from '../../utils';
import { normalizeForm } from '../../helpers';

export const FormContext = React.createContext<FormContextProps>(undefined);

export const Form: React.FC<FormProps> = ({ form, loading, isKey = false, isMap = false, onSubmit, children, ...props }): JSX.Element => {

  const data = form && normalizeForm(form) || props;
  const { current: values } = useRef({});
  const { current: errors } = useRef({});
  const { current: formSchema } = useRef({});

  const [submit, setSubmit] = useState<string | undefined>();

  useEffect(() => {

    if (submit === 'submit') {
      console.log(values);
      const { error } = Joi.object(formSchema).validate(values, { abortEarly: false });

      if (error) {
        setDetailsToErrors(error.details, errors)
      }

      if (Object.keys(errors).length === 0) {
        onSubmit && onSubmit(values);
      }
    }

    return () => setSubmit(undefined);
  }, [submit]);

  const handleSubmit = useCallback((name: string) => {
    setSubmit(name)
  }, []);

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <form>
      <FormContext.Provider value={{ data, values, errors, loading, submit, formSchema, isKey, isMap, handleSubmit }}>
        {
          children || render({ data })
        }
      </FormContext.Provider>
    </form>
  )
}


