import React from 'react';

//import { useWrapperContext } from '../../hooks';

//import FormContext from './form.provider';

import FormBlock from './form.block';
import FormField from './form.field';
import FormElement from './form.element';
import FormHolder from './form.holder';
import FormGrid from './form.grid';
import FormGroup from './form.group';


function FormRender({ data = [] }: { data: any[] }) {
  //const _context = useWrapperContext(FormContext);

  const render = (items: any[]): React.ReactNode[] => {
    return items.map(item => {
      const { group, children } = item;

      switch (group) {
        case 'block':
          return (
            <FormBlock key={item.id}>{render(children)}</FormBlock>
          );
        case 'holder':
          return (
            <FormHolder key={item.id}>{render(children)}</FormHolder>
          );
        case 'grid':
          return (
            <FormGrid key={item.id}>{render(children)}</FormGrid>
          );
        case 'group':
          return (
            <FormGroup key={item.id}>{render(children)}</FormGroup>
          );
        case 'field':
          return (
            <FormField key={item.id}></FormField>
          );
        case 'element':
          return (
            <FormElement key={item.id}></FormElement>
          );
        default:
          break;
      }

      if (children && children.length > 0) {
        return (
          <div key={item.id}>
            {render(children)}
          </div>
        );
      }

      return null;
    });
  };

  return (
    <>
      {render(data)}
    </>
  );
}

export default FormRender;