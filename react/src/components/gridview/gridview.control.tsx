import React, { useEffect, useState } from 'react';
import { childrenToObjectKey } from '../../utils';

export const ControlContext = React.createContext<any>(undefined);

export const Control: React.FC = ({ children }): JSX.Element => {

  const initialValues = childrenToObjectKey(children);

  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    console.log(values);
  }, []);

  const handleChange = (value?: string) => {
    console.log(value);
  }

  return <div>
    <ControlContext.Provider value={{ handleChange }}>
      {
        children
      }
    </ControlContext.Provider>
  </div>
}