import React, { useCallback, useRef } from 'react';
import { normalizeForm } from '../../helpers';

import { FormRender as render } from './form.render';
import { FormHeader } from './form.header';
import { FormFooter } from './form.footer';
import { FormContextProps, FormProps } from './form.type';

export const FormContext = React.createContext<FormContextProps>(undefined);

export const Form: React.FC<FormProps> = ({ form, onSubmit, children }): JSX.Element => {

  const data = form && normalizeForm(form);
  const { current: values } = useRef({});

  const handleSubmit = useCallback((name: string) => {
    if (name === 'submit') {
      onSubmit && onSubmit(values);
    }
  }, []);

  return (
    <form>
      <FormContext.Provider value={{ data, values, handleSubmit }}>
        {
          children || <><FormHeader /> {render({ data })} <FormFooter /></>
        }
      </FormContext.Provider>
    </form>
  )
}


