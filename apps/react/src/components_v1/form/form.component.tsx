import { PropsWithChildren } from "react";

import { FormProvider } from "./contexts";
import { FormOptions, useFormState } from './hooks';
import { FieldType, FormResult } from "./types";
import { FormRender } from "./form.render";

interface IProps extends PropsWithChildren {
  title?: string;
  data?: FieldType[] | null;
  options?: FormOptions;
  status?: string;
  loading?: boolean;
  onSubmit?: (result: FormResult) => void;
}

export function Form({ title, data = [], options, status, loading, children, onSubmit }: IProps) {

  const contextValue = useFormState({ title, data, options, status, loading, callback: onSubmit });

  return (
    <form onSubmit={e => e.preventDefault()}>
      {loading && <div>loading...</div>}
      <FormProvider value={contextValue}>
        {children || <FormRender />}
      </FormProvider>
    </form>
  )
}

// npx madge src/components_v1/form/form.component.tsx --image src/components_v1/form/form.graph.png --warning