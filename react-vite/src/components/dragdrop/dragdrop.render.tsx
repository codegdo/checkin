import React, { memo } from 'react';
import DropBlock from './drop.block';

interface DragDropItem {
  id: string;
  dataType: 'block';
}
export interface DragDropRenderProps {
  data: DragDropItem[];
}

const DragDropRender: React.FC<DragDropRenderProps> = memo(({ data = [] }): JSX.Element => {
  return (
    <>
      {
        data.map((item: any) => {
          const { id, dataType } = item;

          switch (dataType) {
            case 'block': return <DropBlock key={id} dataType={dataType} />
            default: return null;
          }
        })
      }
    </>
  );
});

export default DragDropRender;