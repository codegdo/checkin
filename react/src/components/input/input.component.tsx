import React from 'react';

export const InputContext = React.createContext<any>(undefined);

export const InputComponent: React.FC<any> = ({ data, onChange, children }): JSX.Element => {


  const handleChange = () => {
    onChange && onChange();
  };

  return (
    <div>
      <InputContext.Provider value={{}}>
        {
          children
        }
      </InputContext.Provider>
    </div>
  )
}


