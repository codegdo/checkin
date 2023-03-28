import React, { memo, PropsWithChildren } from 'react';
import { FormBlock } from './form.block';
import { FormField } from './form.field';
import { FormElement } from './form.element';
import { FormGrid } from './form.grid';
import { FormGroup } from './form.group';
import { DataType, Element } from './form.type';



interface FormRenderProps extends PropsWithChildren {
  data?: Element[]
}

export const FormRender = memo(({ data = [], children }: FormRenderProps) => {
  return (
    <>
      {
        children ? children : data.map((item, i) => {
          const { dataType } = item;

          switch (dataType) {
            case DataType.BLOCK: return <FormBlock key={i} {...item} />;
            case DataType.ELEMENT: return <FormElement key={i} {...item} />;
            case DataType.FIELD: return <FormField key={i} {...item} />;
            case DataType.GROUP: return <FormGroup key={i} {...item} />;
            case DataType.GRID: return <FormGrid key={i} {...item} />;
            default: return null;
          }
        })
      }
    </>
  );
});