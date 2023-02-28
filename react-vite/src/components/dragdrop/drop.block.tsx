import React, { PropsWithChildren } from 'react';
import { DataType, useDragDrop } from '../../hooks';
import DragDropRender from './dragdrop.render';

interface DropBlockProps extends PropsWithChildren {
  dataType: string,
  data?: []
}

const DropBlock: React.FC<DropBlockProps> = ({ dataType, data = [], children }): JSX.Element => {
  const { ref, drag, drop } = useDragDrop({ dataType });
  drag(drop(ref));

  return (
    <div ref={ref} style={{ width: '500px', height: '500px', border: '1px solid #ddd' }}>
      {children ? children : <DragDropRender data={data} />}
    </div>
  );
};

export default DropBlock;