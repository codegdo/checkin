import React from 'react';
import { Block, BlockData } from './form.block';
import { Field, FieldData } from './form.field';

type RenderProps = {
  data?: Partial<BlockData & FieldData>[];
}

export const Render: React.FC<RenderProps> = ({ data }): JSX.Element | null => {

  console.log('RENDER', data);

  return data ? (
    <>
      {
        data.map((item) => {
          console.log('ITEM', item);
          switch (item?.role) {
            case 'block': return <Block key={item.id} block={item} />;
            case 'field': return <Field key={item.id} field={item} />;
            default: return null;
          }
        })
      }
    </>
  ) : null;
}
