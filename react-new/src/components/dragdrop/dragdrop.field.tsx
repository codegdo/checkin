import React, { useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { dragdropHelper } from '../../helpers';
import { debounce } from '../../utils';

export const DragDropField: React.FC<any> = (props): JSX.Element => {

  const { id, name, role, position, data, parentId, focus, setFocus, moveItem } = props;
  const ref = useRef<HTMLDivElement>(null);
  const toolbar = useRef<HTMLDivElement>(null);

  let _x = 0, _y = 0;

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'field',
      item: { ...props },
      canDrag: () => {

        console.log('CAN DRAG', ref.current);
        setFocus(null);

        return true;
      },
      collect: monitor => ({
        isDragging: monitor.isDragging()
      }),
      end: (item, monitor) => {
        const didDrop = monitor.didDrop();

        if (didDrop) {

          moveItem(item);
        }
      }
    }),
    [id, moveItem]
  );

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['block', 'field'],
    drop: () => {
      if (ref.current) {
        ref.current.style.transition = 'none';
      }
    },
    hover: (item: any, monitor) => {

      if (!ref.current) {
        return;
      }

      const dragIndex = item.position;
      const hoverIndex = position;

      // don't replace items with themselves
      if (dragIndex === hoverIndex) {
        props.current.drop = null;
        return;
      }
      // determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect() as {
        top: number;
        right: number;
        bottom: number;
        left: number;
        width: number;
        height: number;
        x: number;
        y: number;
      };
      // determine mouse position
      const clientOffset = monitor.getClientOffset() as {
        x: number
        y: number
      }
      // get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // get horizontal middle
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      // get pixels to the left
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      // check hover ref isOver 
      if (monitor.isOver({ shallow: true })) {
        const display = dragdropHelper.parentNodeDisplay(ref.current.parentNode as HTMLElement);
        if (props.current.drop == null) {
          props.current.drop = {
            id,
            data,
            position,
            role,
            parentId
          };
        } else if (props.current.drop.id !== props.id) {
          props.current.drop = {
            id,
            data,
            position,
            role,
            parentId
          };
        }

        if (ref.current.hasAttribute('style')) {
          ref.current.removeAttribute('style');
        }

        if (display == 'row') {
          if (_x == clientOffset.x) return;

          _x = clientOffset.x;

          // dragging left
          if (hoverClientX < hoverMiddleX) {
            ref.current.classList.add('on-left');
            ref.current.classList.remove('on-right');
            props.current.drop.offset = 'left';
          } else if (hoverClientX > hoverMiddleX) {
            ref.current.classList.add('on-right');
            ref.current.classList.remove('on-left');
            props.current.drop.offset = 'right';
          }

        } else {
          if (_y == clientOffset.y) return;

          _y = clientOffset.y;

          // dragging down
          if (hoverClientY < hoverMiddleY) {
            ref.current.classList.add('on-top');
            ref.current.classList.remove('on-bottom');
            props.current.drop.offset = 'top';
          } else if (hoverClientY > hoverMiddleY) {
            ref.current.classList.add('on-bottom');
            ref.current.classList.remove('on-top');
            props.current.drop.offset = 'bottom';
          }
        }
      }

    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true })
    }),
  }), [id, moveItem]);

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: false })
  }, []);

  useEffect(() => {
    //props.current.toolbar = focus == id ? toolbar.current : null;
  }, [focus]);

  const className = `dd-field${isOver ? ' _over' : ''}${isDragging ? ' dragging' : ''}${focus?.id == id ? ' focus' : ''}`;

  const handleFocusClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    setFocus(focus?.id == id ? null : { id, clickMe });
  }

  const handleButtonClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    alert();
  }

  const clickMe = () => {
    alert(`CLICK ${id}`);
  }

  drag(drop(ref));

  return (
    <div
      className={className}
      id={id}
      ref={ref}
      tabIndex={position}
      onClick={handleFocusClick}>
      {
        focus?.id == id && <div ref={toolbar} className={isDragging ? 'dd-toolbar hidden' : 'dd-toolbar'}>
          <button type="button" onClick={handleButtonClick}>delete</button>
        </div>
      }
      <div className="dd-content">{name}</div>
    </div>
  );
};
