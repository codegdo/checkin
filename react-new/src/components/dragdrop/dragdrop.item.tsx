import React, { FC, useRef } from 'react';
import { useDrag, useDragLayer, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { dragdropHelper } from '../../helpers';
import { DragDropField } from './dragdrop.field';
import { DragDropBlock } from './dragdrop.block';
import { DragDropElement } from './dragdrop.element';
import { DragDropToolbar } from './dragdrop.toolbar';

export const DragDropItem: FC<any> = (props): JSX.Element => {

  const {
    id,
    name,
    role,
    type,
    position,
    data,
    parentId,
    holderId,
    current,
    draggable = true,
    item: targetItem,
    setItem,
    moveItem
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  const { currentDragging } = useDragLayer((monitor) => ({
    currentDragging: monitor.isDragging(),
  }));

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: role,
      item: { ...props },
      canDrag: () => {
        if (ref.current) {
          preview(getEmptyImage(), { captureDraggingState: false });
          current.isOver = true;
        }

        if (targetItem?.id !== id) {
          setItem && setItem(null);
        }

        return !!draggable;
      },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const didDrop = monitor.didDrop();

        if (didDrop) {
          moveItem(item);
        }
      }
    }),
    [id, moveItem, targetItem]
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ['dropzone', 'dropholder', 'block', 'element', 'field'],
      drop: () => {
        if (ref.current) {
          //ref.current.style.transition = 'none';
          //ref.current.removeAttribute('style');
        }
      },
      hover: (item: any, monitor) => {

        // current over
        if (monitor.isOver({ shallow: true })) {

          if (
            !ref.current ||
            item.id === id ||
            (role === 'dropzone' && item.list.length !== 0) // if dropzone has children prevent the drop
          ) {
            current.drop = null;
            return;
          }

          // undefined == null is true
          if (current.drop == null || current.drop.id !== id) {
            current.drop = {
              id,
              role,
              type,
              data,
              position,
              parentId,
              holderId,
              x: 0,
              y: 0,
              isOver: false
            };
          }

          dragdropHelper.hover(monitor, ref, current);
        }
      },
      collect: monitor => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    }), [id, moveItem]);

  const handleMouseOver = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (ref.current) {

      !currentDragging && ref.current.classList.add('-hover');

      // prevent event bubble up
      if (current.isOver) {
        ref.current.classList.remove('-hover');
        current.isOver = false;
      }
    }
  };

  const handleMouseOut = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (ref.current) {
      ref.current.classList.remove('-hover');
    }
  }

  const classString = `dd-${role}${isDragging ? ' dragging' : ''}${isOver ? ' -over' : ''}${(data?.length == 0) ? ' -empty' : ''}${targetItem?.id == id ? ' -focus' : ''}`;
  const title = (role == 'block') ? name : role;
  const events = draggable ? {
    onMouseOver: handleMouseOver,
    onMouseOut: handleMouseOut
  } : {};

  drag(drop(ref));

  const render = () => {
    switch (role) {
      case 'block':
      case 'dropzone':
      case 'dropholder':
        return <DragDropBlock {...props} />
      case 'element':
        return <DragDropElement {...props} />
      case 'field':
        return <DragDropField {...props} />
      default: return null;
    }
  };

  return (
    <div className={classString} id={id} ref={ref} tabIndex={position} data-title={title} {...events}>
      {
        targetItem?.id == id && <DragDropToolbar {...props} />
      }
      {
        render()
      }
    </div>
  );
};
