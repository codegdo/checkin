import { PropsWithChildren } from "react";

import { FormProvider } from "./contexts";
import { FormOptions, useFormState } from './hooks';
import { FormFieldType, FormResult } from "./types";
import { FormRender } from "./form.render";


interface IFormProps extends PropsWithChildren {
  title?: string;
  data?: FormFieldType[];
  options?: FormOptions;
  status?: string;
  onSubmit?: (result: FormResult) => void;
}

export function Form({title, data = [], options, status, children, onSubmit }: IFormProps) {

  const contextValue = useFormState({title, data, options, status, callback: onSubmit });

  return (
    <form onSubmit={e => e.preventDefault()}>
      <FormProvider value={contextValue}>
        {children || <FormRender />}
      </FormProvider>
    </form>
  )
}

// npx madge src/components_v1/form/form.component.tsx --image src/components_v1/form/form.graph.png --warning