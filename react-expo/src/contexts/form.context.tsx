import React from 'react';

export const FormContext = React.createContext<null>(null);

export const FormProvider: React.FC = (props) => {
  return <FormContext.Provider value={null}>
    {props.children}
  </FormContext.Provider>
}