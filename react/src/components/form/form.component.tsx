import React, { useCallback, useRef } from 'react';

type FormProps = {
  onSubmit: (values: Record<string, unknown>) => void;
}

type FormContextProps = {
  values: Record<string, unknown>;
  handleSubmit: (name: string) => void;
} | undefined;

export const FormContext = React.createContext<FormContextProps>(undefined);

export const Form: React.FC<FormProps> = ({ onSubmit, children }): JSX.Element => {

  const { current: values } = useRef({});

  const handleSubmit = useCallback((name: string) => {
    console.log('Form handleSubmit()', name);
    onSubmit(values);
  }, []);

  return (
    <form>
      <FormContext.Provider value={{ values, handleSubmit }}>
        {
          children
        }
      </FormContext.Provider>
    </form>
  )
}


