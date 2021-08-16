import React, { useCallback } from 'react';

import { FormButton } from './button/form.button';

interface FormExtends {
  Button: typeof FormButton;
}

export const FormContext = React.createContext<{ onClick: () => void } | undefined>(undefined);

export const Form: React.FC & FormExtends = ({ children }): JSX.Element => {

  const onClick = useCallback(() => {
    console.log('click');
  }, []);

  return (
    <form>
      <FormContext.Provider value={{ onClick }}>
        {
          children
        }
      </FormContext.Provider>
    </form>
  )
}

Form.Button = FormButton;

