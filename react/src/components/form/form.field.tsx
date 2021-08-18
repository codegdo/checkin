import React, { useContext, useEffect, useState } from 'react';
import { FormContext } from './form.component';
import { Input } from './form.input';
import { Label } from './form.label';

export type FieldData = {
  id?: string | number;
  label?: string;
  name?: string;

  type?: "text" | "number" | "currency" | "date" | "password" | undefined;
  role?: 'block' | 'field';

  data?: FieldData[];

  value?: string;
  defaultValue?: string;
}

type FieldProps = {
  field?: FieldData;
} & FieldData;

type FieldContextProps = {
  data: FieldData,
  value: string | undefined,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
} | undefined;

export const FieldContext = React.createContext<FieldContextProps>(undefined);

export const Field: React.FC<FieldProps> = (props): JSX.Element => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error();
  }

  const { children, field, ..._props } = props;
  const data = field ? field : _props;
  const { name = '', value: initialValue, defaultValue = '' } = field || _props;

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
      <FieldContext.Provider value={{ data, value, handleChange }}>
        {
          children || <><Label /><Input /></>
        }
      </FieldContext.Provider>
    </div>
  )
}
