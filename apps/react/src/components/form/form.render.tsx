import { useWrapperContext } from '@/hooks';
import { FormField as Field } from './types';

import { FormBlock } from './form.block';
import { FormField } from './form.field';
import { FormElement } from './form.element';
import { FormGrid } from './form.grid';
import { FormGroup } from './form.group';

import FormContext from './form.provider';
import { FormSection } from './form.section';

interface RenderProps {
  data?: Field[] | null;
}

const render = ({ data }: RenderProps) => {

  if (data == null) return null;

  return data.map((item, i) => {
    const { dataType, data } = item;

    switch (dataType) {
      case 'section':
        return (
          <FormSection key={i}>{render({ data })}</FormSection>
        );
      case 'block':
        return (
          <FormBlock key={i}>{render({ data })}</FormBlock>
        );
      case 'grid':
        return (
          <FormGrid key={i} {...item}></FormGrid>
        );
      case 'group':
        return (
          <FormGroup key={i} {...item}></FormGroup>
        );
      case 'field':
        return (
          <FormField key={i} {...item}></FormField>
        );
      case 'element':
        return (
          <FormElement key={i} {...item}></FormElement>
        );
      default:
        return null;
    }

  });
};

export function FormRender() {
  const { data } = useWrapperContext(FormContext);

  return (<>{render({ data })}</>);
}
