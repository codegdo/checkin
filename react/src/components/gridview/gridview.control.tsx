import React from 'react';

export const ControlContext = React.createContext<any>(undefined);

export const Control: React.FC = ({ children }): JSX.Element => {

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