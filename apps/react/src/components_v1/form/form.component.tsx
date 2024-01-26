import { PropsWithChildren } from "react";

import { FormContext } from "./contexts";
import { FormProps, useFormState } from './hooks';

import { FormContent } from "./form.content";

export function Form({ children, ...props }: PropsWithChildren<FormProps>) {

  const context = useFormState({ ...props });

  return (
    <form onSubmit={e => e.preventDefault()}>
      <FormContext.Provider value={context}>
        {children || <FormContent />}
      </FormContext.Provider>
    </form>
  )
}

// npx madge src/components_v1/form/form.component.tsx --image src/components_v1/form/form.graph.png --warning