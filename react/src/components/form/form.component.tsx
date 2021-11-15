import React, { useCallback, useEffect, useRef, useState } from 'react';
import Joi from 'joi';

import { FormRender as render } from './form.render';
import { FormContextProps, FormProps } from './form.type';
import { flattenObject, setDetailsToErrors, trimValues } from '../../utils';
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

      const { error } = Joi.object(formSchema).validate((isMap ? flattenObject(values) : values), { abortEarly: false });

      if (error) {
        setDetailsToErrors(error.details, errors)
      }

      if (Object.keys(errors).length === 0) {
        console.log(values);
        console.log('TRIM', trimValues(values))
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


