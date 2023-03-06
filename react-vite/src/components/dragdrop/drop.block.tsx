import React, { PropsWithChildren } from 'react';
import { useDragDrop } from '../../hooks';
import getClassNames from 'classnames';


import DragDropRender from './dragdrop.render';
import { DndItem, DndItemType } from './dragdrop.type';

const DropBlock: React.FC<PropsWithChildren<DndItem>> = ({ children, ...item }): JSX.Element => {
  const { className = '', dataType, data = [] } = item;
  const acceptTypes = Object.values(DndItemType);
  const { ref, drag, drop, isDragging, isOver, hasEmptyList, onMouseOver, onMouseOut } = useDragDrop(item, acceptTypes);

  const classNames = getClassNames({
    'drop-item drop-block': dataType !== 'area',
    [className]: true,
    'is-dragging': isDragging,
    'is-over': isOver,
    'is-empty': hasEmptyList,
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={classNames}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {children || <DragDropRender data={data} />}
    </div>
  );
};

export default DropBlock;