import React, { useRef } from 'react';
import { useDrag, useDragLayer, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import classNames from 'classnames';
import { dragdropHelper } from '../helpers';

type DrapDropReturn = {
  ref: React.RefObject<HTMLDivElement>,
  stringClass: string;
  attributes: { [key: string]: string };
  onMouseOver: (event: React.MouseEvent) => void;
  onMouseOut: (event: React.MouseEvent) => void;
}

export const useDragDrop = (props: any): DrapDropReturn => {
  const { id, dataType, name, data, parentId, placeholderId, position, current, state, dispatch } = props;

  const dragdropType = ['dropzone', 'placeholder', 'block', 'element', 'field'];
  const ref = useRef<HTMLDivElement>(null);

  const { itemType, onDragging } = useDragLayer((monitor) => ({
    itemType: monitor.getItemType(),
    onDragging: monitor.isDragging(),
  }));

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: dataType,
      item: { ...props },
      canDrag: () => {
        preview(getEmptyImage(), { captureDraggingState: false });

        if (dataType == 'dropzone' || dataType == 'placeholder') {
          return false;
        }

        return true;
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const didDrop = monitor.didDrop();

        if (didDrop) {
          //console.log(item);
          dispatch({
            type: 'MOVE_ITEM',
            payload: item
          });
        }
      },
    }),
    [id, state]
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: dragdropType,
      hover: (item: any, monitor) => {
        if (!ref) return;

        // current over
        if (monitor.isOver({ shallow: true })) {
          if (!ref.current || item.id === id || (dataType == 'dropzone' && state.data?.length !== 0)) {
            current.drop = null;
            return;
          }

          if (current.drop == null || current.drop.id !== id) {
            current.isOver = true;
            current.drop = {
              id,
              dataType,
              name,
              data,
              parentId,
              placeholderId,
              position,
              //
              displayAs: dragdropHelper.display(ref.current),
              clientOffsetX: 0,
              clientOffsetY: 0,
            };
          }

          dragdropHelper.hover({
            dragItem: item,
            dropItem: current.drop,
            monitor,
            ref,
          });
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    }),
    [id, state]
  );

  const onMouseOver = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (ref.current) {
      ref.current.classList.add('-hover');

      // prevent event bubble up
      if (current.isOver) {
        ref.current.classList.remove('-hover');
        current.isOver = false;
      }
    }
  };

  const onMouseOut = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (ref.current) {
      ref.current.classList.remove('-hover');
    }
  };

  const isFocus = state.item?.id == id;
  const isDragDropType = dragdropType.includes(itemType as string);
  const isEmpty = (dataType == 'block' || dataType == 'dropzone') && data?.length == 0;
  const title = (dataType == 'block' ? name : dataType) as string;

  const stringClass = classNames({
    [`dd-${title}`]: true,
    'on-drag': onDragging && isFocus && isDragDropType,
    '-dragging': isDragging,
    '-over': isOver,
    '-empty': isEmpty,
    '-focus': isFocus
  });

  const attributes = { "data-title": title }

  drag(drop(ref));

  return { ref, stringClass, attributes, onMouseOver, onMouseOut };
};

