import React, { useCallback, useEffect, useRef, useState } from 'react';
import Joi from 'joi';

import { FormRender as render } from './form.render';
import { FormContextProps, FormProps } from './form.type';
import { flattenObject, setDetailsToErrors, trimValues } from '../../utils';
import { normalizeForm } from '../../helpers';

export const FormContext = React.createContext<FormContextProps>(undefined);

export const Form: React.FC<FormProps> = ({ form, loading, isKey = false, isMap = false, onSubmit, onCallback, children, ...props }): JSX.Element => {

  const [data, setData] = useState(form || props);

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
        //console.log('TRIM', trimValues(values))
        onSubmit && onSubmit(values);
      }
    }

    return () => setSubmit(undefined);
  }, [submit]);

  const handleClick = useCallback((name: string) => {
    if (name === 'submit') {
      setSubmit(name);
    } else {
      onCallback && onCallback(name);
    }
  }, []);

  useEffect(() => {
    if (form) {
      setData(normalizeForm(form))
    }
  }, []);

  return (
    <form>
      <FormContext.Provider value={{ data, values, errors, loading, submit, formSchema, isKey, isMap, handleClick }}>
        {
          children || render({ data })
        }
      </FormContext.Provider>
    </form>
  )
}


