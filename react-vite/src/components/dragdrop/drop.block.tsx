import React, { PropsWithChildren } from 'react';
import { useDragDrop } from '../../hooks';
import classNamesFn from 'classnames';


import DragDropRender from './dragdrop.render';
import { DndItem, DndItemType } from './dragdrop.type';

const DropBlock: React.FC<PropsWithChildren<DndItem>> = ({ children, ...item }): JSX.Element => {
  const { className = 'drop-block', data = [] } = item;
  const acceptTypes = Object.values(DndItemType);
  const { ref, drag, drop, isDragging, isOver, onMouseOver, onMouseOut } = useDragDrop(item, acceptTypes);

  const classNames = classNamesFn({
    [className]: true,
    'is-dragging': isDragging,
    'is-over': isOver,
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={classNames}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {children ? children : <DragDropRender data={data} />}
    </div>
  );
};

export default DropBlock;