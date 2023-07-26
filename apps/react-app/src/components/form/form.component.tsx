
import { PropsWithChildren } from 'react';
import { FormProvider } from './form.provider';
import FormRender from './form.render';
import { useForm } from './hooks/use-form.hook';
import { FormFieldType } from './types';

interface FormOptions {
  mapKey?: string;
  hasSteps?: boolean;
  animation?: 'slide';
}

export interface FormProps extends PropsWithChildren {
  title?: string;
  description?: string;
  className?: string;
  data?: FormFieldType[];

  status?: string | undefined;
  options?: FormOptions;
  onCallback?: (data: string) => void;
}

function Form({ children, ...props }: FormProps) {
  const ctx = useForm(props);
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <FormProvider value={{ ...ctx }}>
        {children || <FormRender />}
      </FormProvider>
    </form>
  )
}

export default Form;