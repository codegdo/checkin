import React from 'react';
import { Block } from './form.block';
import { Element } from './form.element';
import { Field } from './form.field';
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
            case 'block': return <Block key={item.id} block={item} />;
            case 'field': return <Field key={item.id} field={item} />;
            case 'element': return <Element key={item.id} element={item} />;
            default: return null;
          }
        })
      }
    </>
  );
}
