import React from 'react';

export const FieldContext = React.createContext<{ onChange: () => void } | undefined>(undefined);

export const Field: React.FC<{ onChange: () => void }> = ({ onChange, children }): JSX.Element => {

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

