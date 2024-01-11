import { PropsWithChildren } from "react";

import { FormProvider } from "./contexts";
import { useFormState } from './hooks';
import { CustomField, FormReturn } from "./types";
import { FormRender } from "./form.render";

interface IFormProps extends PropsWithChildren {
  title?: string;
  data?: CustomField[] | null;
  status?: string;
  onClick?: (returnData: FormReturn) => void;
}

export function Form({ status, children, onClick, ...field }: IFormProps) {

  const contextValue = useFormState({ status, callback: onClick });

  return (
    <form onSubmit={e => e.preventDefault()}>
      <FormProvider value={contextValue}>
        {children || <FormRender form={field} />}
      </FormProvider>
    </form>
  )
}

// npx madge src/components_v1/form/form.component.tsx --image src/components_v1/form/form.graph.png --warning