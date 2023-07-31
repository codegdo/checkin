import { PropsWithChildren } from 'react';

import { useForm } from './hooks';
import { Field } from './types';

import { FormProvider } from './form.provider';
import { FormRender } from './form.render';
import { FormSection } from './form.section';
import { FormBlock } from './form.block';
import { FormField } from './form.field';
import { FormGrid } from './form.grid';
import { FormGroup } from './form.group';
import { FormElement } from './form.element';

interface FormOptions {
  mapKey?: string;
  hasSteps?: boolean;
  animation?: 'slide';
}

interface FormExtendProps {
  Section?: typeof FormSection;
  Block?: typeof FormBlock;
  Field?: typeof FormField;
  Element?: typeof FormElement;
  Group?: typeof FormGroup;
  Grid?: typeof FormGrid;
}

export interface FormProps extends PropsWithChildren {
  title?: string;
  description?: string;
  className?: string;
  data?: Field[];

  status?: string | undefined;
  options?: FormOptions;
  onCallback?: (data: string) => void;
}


export function Form({ data = [], onCallback, children }: FormProps & FormExtendProps) {
  const { values, errors, handleClick } = useForm({ onCallback });
  return (
    <form onSubmit={e => e.preventDefault()}>
      <FormProvider value={{ data, values, errors, handleClick }}>
        {children || <FormRender />}
      </FormProvider>
    </form>
  )
}

Form.Section = FormSection;
Form.Block = FormBlock;
Form.Field = FormField;
Form.Element = FormElement;
Form.Group = FormGroup;
Form.Grid = FormGrid;