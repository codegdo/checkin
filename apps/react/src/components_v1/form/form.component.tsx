import { PropsWithChildren } from "react";

import { FormProvider } from "./contexts";
import { useFormState } from './hooks';
import { FormFieldType, FormResult } from "./types";
import { FormRender } from "./form.render";

interface IFormProps extends PropsWithChildren {
  title?: string;
  data?: FormFieldType[];
  status?: string;
  onSubmit?: (result: FormResult) => void;
}

export function Form({ data = [], status, children, onSubmit }: IFormProps) {

  const contextValue = useFormState({ status, callback: onSubmit });

  return (
    <form onSubmit={e => e.preventDefault()}>
      <FormProvider value={contextValue}>
        {children || <FormRender data={data} />}
      </FormProvider>
    </form>
  )
}

// npx madge src/components_v1/form/form.component.tsx --image src/components_v1/form/form.graph.png --warning