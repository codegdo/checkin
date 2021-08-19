import React, { useCallback, useRef } from 'react';
import { normalizeForm } from '../../helpers';

import { Render } from './form.render';

type FieldData = {
  label: string;
  name: string;
  type: string;
}

export type FormData = {
  data?: any,
  fields?: FieldData[]
}

type FormProps = {
  form?: FormData;
  onSubmit: (values: Record<string, unknown>) => void;
}

type FormContextProps = {
  data: FormData | undefined;
  values: any;
  handleSubmit: (name: string) => void;
} | undefined;

export const FormContext = React.createContext<FormContextProps>(undefined);

export const Form: React.FC<FormProps> = ({ form, onSubmit, children }): JSX.Element => {

  const data = form && normalizeForm(form);
  const { current: values } = useRef({});

  const handleSubmit = useCallback((name: string) => {
    console.log('Form handleSubmit()', name);
    onSubmit(values);
  }, []);

  return (
    <form>
      <FormContext.Provider value={{ data, values, handleSubmit }}>
        {
          children || <Render data={data?.data} />
        }
      </FormContext.Provider>
    </form>
  )
}


