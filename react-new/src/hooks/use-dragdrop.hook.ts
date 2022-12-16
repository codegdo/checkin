import React, { useRef } from 'react';
import { useDrag, useDragLayer, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { dragdropHelper } from '../helpers';

export const useDragDrop = (props: any): any => {
  const { id, dataType, name, data, parentId, placeholderId, position, context } = props;
  const { current, state, item: currentItem, setItem, moveItem } = context;
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
          console.log(item);
          moveItem(item);
        }
      },
    }),
    [id, moveItem]
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
    [id, moveItem]
  );

  const onMouseOver = (event: any) => {
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

  const onMouseOut = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (ref.current) {
      ref.current.classList.remove('-hover');
    }
  };

  const onDrag = (onDragging && currentItem?.id == id && dragdropType.includes(itemType as string)) ? ' on-drag' : '';
  const dragging = isDragging ? ' dragging' : '';
  const over = isOver ? ' -over' : '';
  const empty =
    (dataType == 'block' || dataType == 'dropzone') && data?.length == 0
      ? ' -empty'
      : '';
  const focus = currentItem?.id == id ? ' -focus' : '';
  const title = (dataType == 'block' ? name : dataType) as string;

  const classNames = `dd-${title}${dragging}${onDrag}${over}${empty}${focus}`;
  const attributes = { "data-title": title }

  drag(drop(ref));

  return { ref, classNames, attributes, onMouseOver, onMouseOut };
};

