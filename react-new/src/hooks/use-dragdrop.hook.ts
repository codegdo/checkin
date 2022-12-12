import React, { useRef } from 'react';
import { useDrag, useDragLayer, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { dragdropHelper } from '../helpers';

export const useDragDrop = (props: any): any => {
  const { id, role, name, data, parentId, placeholderId, position, context } = props;
  const { current, state, item: currentItem, setItem, moveItem } = context;

  const ref = useRef<HTMLDivElement>(null);

  const { onDragging } = useDragLayer((monitor) => ({
    onDragging: monitor.isDragging(),
  }));

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: role,
      item: { ...props },
      canDrag: () => {
        preview(getEmptyImage(), { captureDraggingState: false });

        if (role == 'dropzone' || role == 'placeholder') {
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
      accept: ['dropzone', 'placeholder', 'block', 'element', 'field'],
      hover: (item: any, monitor) => {
        if (!ref) return;

        // current over
        if (monitor.isOver({ shallow: true })) {
          if (!ref.current || item.id === id || (role == 'dropzone' && state.data?.length !== 0)) {
            current.drop = null;
            return;
          }

          if (current.drop == null || current.drop.id !== id) {
            current.isOver = true;
            current.drop = {
              id,
              role,
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

  const dragging = isDragging ? ' dragging' : '';
  const over = isOver ? ' -over' : '';
  const empty =
    (role == 'block' || role == 'dropzone') && data?.length == 0
      ? ' -empty'
      : '';
  const focus = currentItem?.id == id ? ' -focus' : '';
  const title = (role == 'block' ? name : role) as string;

  const classNames = `dd-${title}${dragging}${over}${empty}${focus}`;
  const attributes = { "data-title": title }

  drag(drop(ref));

  return { ref, classNames, attributes, onMouseOver, onMouseOut };
};

/* export const useDragDrop = (props: any): any => {

  const {
    id,
    name,
    role,
    type,
    data,
    position,
    parentId,
    holderId,

    current,
    draggable = true,
    item: currentItem,
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
        if (ref && ref.current) {
          preview(getEmptyImage(), { captureDraggingState: false });
          current.isOver = true;
        }

        if (currentItem?.id !== id) {
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
    [id, moveItem, currentItem]);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ['dropzone', 'dropholder', 'block', 'element', 'field'],
      hover: (item: any, monitor) => {
        if (!ref) return;

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

  drag(drop(ref));

  return { ref, currentDragging, isDragging, isOver }
} */
