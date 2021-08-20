import React from 'react';
import { FormBlock } from './form.block';
import { FormElement } from './form.element';
import { FormField } from './form.field';
import { NormalizeData, RenderProps } from './form.type';

export const FormRender: React.FC<RenderProps> = ({ data }): JSX.Element | null => {

  const { data: array } = data || {};

  if (!array) {
    return null;
  }

  return (
    <>
      {
        array.map((item: NormalizeData) => {
          switch (item.role) {
            case 'block': return <FormBlock key={item.id} block={item} />;
            case 'field': return <FormField key={item.id} field={item} />;
            case 'element': return <FormElement key={item.id} element={item} />;
            default: return null;
          }
        })
      }
    </>
  );
}
