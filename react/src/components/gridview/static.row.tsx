import React from 'react';

export const RowContext = React.createContext<any>(undefined);

export const StaticRow: React.FC<any> = ({ children, ...props }): JSX.Element => {
  return <tr>
    <RowContext.Provider value={props}>
      {children}
    </RowContext.Provider>
  </tr>
}

