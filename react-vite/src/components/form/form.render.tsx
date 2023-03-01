import React, { memo, PropsWithChildren } from 'react';
import FormBlock from './form.block';
import FormField from './form.field';
import FormElement from './form.element';
import FormGrid from './form.grid';
import FormGroup from './form.group';
import { DataType, Element } from './form.type';



interface FormRenderProps extends PropsWithChildren {
  data?: Element[]
}

export const FormRender: React.FC<FormRenderProps> = memo(({ data = [], children }): JSX.Element => {
  return (
    <>
      {
        children ? children : data.map((item, i) => {
          const { dataType } = item;

          switch (dataType) {
            case DataType.Block: return <FormBlock key={i} {...item} />;
            case DataType.Element: return <FormElement key={i} {...item} />;
            case DataType.Field: return <FormField key={i} {...item} />;
            case DataType.Group: return <FormGroup key={i} {...item} />;
            case DataType.Grid: return <FormGrid key={i} {...item} />;
            default: return null;
          }
        })
      }
    </>
  );
});