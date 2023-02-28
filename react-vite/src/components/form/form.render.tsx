import React, { PropsWithChildren } from 'react';
import Block from './form.block';
import Field from './form.field';
import Element from './form.element';
import Grid from './form.grid';
import Group from './form.group';
import { BlockData, DataType, FieldData } from './form.type';

interface RenderProps extends PropsWithChildren {
  data?: (BlockData | FieldData)[]
}

export const FormRender: React.FC<RenderProps> = ({ data = [], children }): JSX.Element | null => {
  return (
    <>
      {
        children ? children : data.map((item, i, list) => {
          const { dataType } = item;

          switch (dataType) {
            case DataType.BLOCK: return <Block key={i} {...item} />;
            case DataType.ELEMENT: return <Element key={i} {...item} />;
            case DataType.FIELD: return <Field key={i} {...item} />;
            case DataType.GROUP: return <Group key={i} {...item} />;
            case DataType.GRID: return <Grid key={i} {...item} />;
            default: return null;
          }
        })
      }
    </>
  );
}