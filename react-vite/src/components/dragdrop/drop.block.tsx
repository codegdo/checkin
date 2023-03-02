import React, { PropsWithChildren } from 'react';
import { useDragDrop, useWrapperContext } from '../../hooks';


import DragDropRender from './dragdrop.render';
import { DndItem, DndItemType } from './dragdrop.type';

const DropBlock: React.FC<PropsWithChildren<DndItem>> = ({ children, ...item }): JSX.Element => {
  const { className, data = [] } = item;
  const acceptType = Object.values(DndItemType);
  const { ref, drag, drop, onMouseOver, onMouseOut } = useDragDrop(item, acceptType);

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={className}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {children ? children : <DragDropRender data={data} />}
    </div>
  );
};

export default DropBlock;