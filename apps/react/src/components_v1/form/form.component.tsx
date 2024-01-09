import { PropsWithChildren } from "react";
import { ComponentField } from "../types";
import { FormProvider } from "./contexts";
import { FormRender } from "./form.render";
import { FormData } from './hooks';

interface IFormProps extends PropsWithChildren {
  title?: string;
  data?: ComponentField[];
  onSubmit?: (formData: FormData) => void;
}

export function Form({ data, children }: IFormProps) {

  return (
    <form onSubmit={e => e.preventDefault()}>
      <FormProvider value={{}}>
        {children || <FormRender data={data} />}
      </FormProvider>
    </form>
  )
}

// npx madge src/components_v1/form/form.component.tsx --image src/components_v1/form/form.graph.png --warning