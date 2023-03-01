import React, { PropsWithChildren } from 'react';
import { useDragDrop, useWrapperContext } from '../../hooks';
import { DragDropContext } from './dragdrop.context';

import DragDropRender from './dragdrop.render';
import { DndItem, DndItemType } from './dragdrop.type';

const DropBlock: React.FC<PropsWithChildren<DndItem>> = ({ children, ...item }): JSX.Element => {
  const { className, data = [] } = item;
  const context = useWrapperContext(DragDropContext);
  const { ref, drag, drop } = useDragDrop(item, DndItemType);

  drag(drop(ref));

  return (
    <div ref={ref} className={className}>
      {children ? children : <DragDropRender data={data} />}
    </div>
  );
};

export default DropBlock;