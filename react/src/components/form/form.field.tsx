import React, { useContext, useEffect, useState } from 'react';
import { FormContext } from './form.component';
import { Input } from './form.input';
import { Label } from './form.label';

type FieldProps = {
  label?: string;
  name: string;

  type: "text" | "number" | "currency" | "date" | "password" | undefined;

  value?: string;
  defaultValue?: string;
}

type FieldContextProps = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
} & FieldProps | undefined;

export const FieldContext = React.createContext<FieldContextProps>(undefined);

export const Field: React.FC<FieldProps> = ({ label, name, type, value: initialValue, defaultValue = '', children }): JSX.Element => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error();
  }

  const { values } = context;
  const [value, setValue] = useState(initialValue || defaultValue);

  useEffect(() => {
    values[name] = value;
  }, [value])


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  return (
    <div>
      <FieldContext.Provider value={{ label, name, type, value, handleChange }}>
        {
          children || <><Label /><Input /></>
        }
      </FieldContext.Provider>
    </div>
  )
}
