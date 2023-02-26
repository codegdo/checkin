import React, { PropsWithChildren } from 'react';
import Block from './form.block';
import Field from './form.field';
import Element from './form.element';
import Grid from './form.grid';
import Group from './form.group';
import { BlockData, DataType, FieldData } from './form.type';

interface RenderProps {
  data?: (BlockData | FieldData)[]
}

export const Render: React.FC<PropsWithChildren<RenderProps>> = ({ data = [], children }): JSX.Element | null => {
  return (
    <>
      {
        children ? children : data.map((item, i, list) => {
          const { type, className, data } = item;

          switch (item?.dataType) {
            case DataType.BLOCK:
              return <Block
                key={i}
                type={type}
                className={className}
                data={data as (BlockData | FieldData)[]}
              />;
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