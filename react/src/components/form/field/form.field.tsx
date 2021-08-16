import React from 'react';
import { useContext } from 'react';
import { FormContext } from '../form.component';

export const FieldContext = React.createContext<{ onChange: () => void } | undefined>(undefined);

export const FormField: React.FC = ({ children }): JSX.Element => {
  const context = useContext(FormContext);

  if (context == undefined) {
    throw new Error();
  }

  const onChange = () => { }

  return (
    <div>
      <FieldContext.Provider value={{ onChange }}>
        {
          children
        }
      </FieldContext.Provider>
    </div>
  )
}