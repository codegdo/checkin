import React, { useContext, useEffect, useState } from 'react';

import { FormContext } from './form.component';

export const FieldContext = React.createContext<{ value: string, handleClick: () => void, handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void } | undefined>(undefined);

export const Field: React.FC<{ value?: string }> = ({ value: initialValue, children }): JSX.Element => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error();
  }

  const { handleSubmit } = context;

  const [value, setValue] = useState(initialValue || '');

  useEffect(() => {
    console.log(value);
  }, [value])

  const handleClick = () => {
    handleSubmit();
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  return (
    <div>
      <FieldContext.Provider value={{ value, handleClick, handleChange }}>
        {
          children
        }
      </FieldContext.Provider>
    </div>
  )
}
