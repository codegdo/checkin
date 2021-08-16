import React, { useCallback } from 'react';

export const FormContext = React.createContext<{ handleSubmit: () => void } | undefined>(undefined);

export const Form: React.FC<{ onSubmit: () => void }> = ({ onSubmit, children }): JSX.Element => {

  const handleSubmit = useCallback(() => {
    console.log('Form handleSubmit()');
    onSubmit();
  }, []);

  return (
    <form>
      <FormContext.Provider value={{ handleSubmit }}>
        {
          children
        }
      </FormContext.Provider>
    </form>
  )
}


