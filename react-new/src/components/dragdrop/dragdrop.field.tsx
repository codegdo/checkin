import React, { useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { dragdropHelper } from '../../helpers';
import { debounce } from '../../utils';

export const DragDropField: React.FC<any> = (props): JSX.Element => {

  const { id, name, role, position, data, parentId, current, focus, setFocus, moveItem, deleteItem } = props;
  const ref = useRef<HTMLDivElement>(null);
  //const [ref] = useAutoAnimate<HTMLDivElement>({ duration: 120 });

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'field',
      item: { ...props },
      canDrag: () => {
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
    accept: ['parent', 'block', 'field', 'component'],
    drop: () => {
      // clear transition delay
      if (ref.current) {
        ref.current.style.transition = 'none';
      }
    },
    hover: (item: any, monitor) => {

      // current over
      if (monitor.isOver({ shallow: true })) {

        if (!ref.current) {
          return;
        }

        if (item.id === id) {
          current.drop = null;
          return;
        }

        if (current.drop == null || current.drop.id !== props.id) {
          current.drop = { id, role, data, position, parentId, x: 0, y: 0 };
        }

        dragdropHelper.onHover(monitor, ref, current);

      }

    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true })
    }),
  }), [id, moveItem]);

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: false })
  }, []);

  const className = `dd-field${isOver ? ' _over' : ''}${isDragging ? ' dragging' : ''}${focus?.id == id ? ' focus' : ''}`;

  const handleFocusClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    setFocus(focus?.id == id ? null : { id, clickMe });
  }

  const handleButtonClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    deleteItem(props);
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
        focus?.id == id && <div className={isDragging ? 'dd-toolbar hidden' : 'dd-toolbar'}>
          <button type="button" onClick={handleButtonClick}>delete</button>
        </div>
      }
      <div className="dd-content">{name}</div>
    </div>
  );
};
