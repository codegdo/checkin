import { useWrapperContext } from '@/hooks';

import FormBlock from './form.block';
import FormField from './form.field';
import FormElement from './form.element';
import FormHolder from './form.holder';
import FormGrid from './form.grid';
import FormGroup from './form.group';

import FormContext from './form.provider';
import { FormFieldType } from './types';

interface RenderProps {
  data?: FormFieldType[] | null;
}

const render = ({ data }: RenderProps) => {

  if (data == null) return null;

  return data.map(field => {
    const { id, group, data } = field;

    switch (group) {
      case 'block':
        return (
          <FormBlock key={id}>{render({ data })}</FormBlock>
        );
      case 'holder':
        return (
          <FormHolder key={id}></FormHolder>
        );
      case 'grid':
        return (
          <FormGrid key={id}></FormGrid>
        );
      case 'group':
        return (
          <FormGroup key={id}></FormGroup>
        );
      case 'field':
        return (
          <FormField key={id}></FormField>
        );
      case 'element':
        return (
          <FormElement key={id}></FormElement>
        );
      default:
        return null;
    }

  });
};

function FormRender() {
  const { data } = useWrapperContext(FormContext);

  return (<>{render({ data })}</>);
}

export default FormRender;