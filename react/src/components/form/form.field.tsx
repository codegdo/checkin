import React, { useContext, useEffect, useState } from 'react';
import { FormContext } from './form.component';
import { Input } from './form.input';
import { Label } from './form.label';
import { FieldContextProps, FieldProps } from './form.type';

export const FieldContext = React.createContext<FieldContextProps>(undefined);

export const Field: React.FC<FieldProps> = ({ children, field, ...options }): JSX.Element => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error();
  }

  const { values } = context;

  const data = field || options;
  const { name = '', value: initialValue, defaultValue = '' } = data;

  console.log('FIELD', data)

  const [value, setValue] = useState(initialValue || defaultValue);

  useEffect(() => {
    values[name] = value;
  }, [value])


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  return (
    <div>
      <FieldContext.Provider value={{ data, value, handleChange }}>
        {
          children || <><Label /><Input /></>
        }
      </FieldContext.Provider>
    </div>
  )
}
