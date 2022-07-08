import React from 'react';
import { Block } from './form.block';
import { Field } from './form.field';
import { FieldData, RenderProps } from './form.type';

export const FormRender: React.FC<RenderProps> = ({ data }) => {

  if (!data) {
    return null;
  }

  const { data: list } = data;

  if (!list) {
    return null;
  }

  return (
    <>
      {
        list.map((item: FieldData) => {
          switch (item.role) {
            case 'block': return <Block key={item.id} {...item} />;
            case 'field': return <Field key={item.id} {...item} />;
            default: return null;
          }
        })
      }
    </>
  );
}