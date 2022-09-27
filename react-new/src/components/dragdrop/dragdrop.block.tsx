import React, { useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { dragdropHelper } from '../../helpers';
import { Render } from './dragdrop.render';

export const DragDropBlock: React.FC<any> = (props): JSX.Element => {

  const { id, role, name, position, data, parentId, focus, current, setFocus, moveItem, deleteItem, children } = props;
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: role,
      item: { ...props },
      canDrag: () => {
        setFocus && setFocus(null);
        return (id == 'dropholder') ? false : true;
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
    [id, moveItem]
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ['parent', 'block', 'field', 'component'],
      drop: () => {
        if (ref.current) {
          ref.current.style.transition = 'none';
        }
      },
      hover: (item: any, monitor) => {

        // current over
        if (monitor.isOver({ shallow: true })) {

          if (!ref.current || id === 'dropholder' || item.id === id) {
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
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    }), [id, moveItem]);

  drag(drop(ref));

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: false })
  }, []);

  const className = `dd-block${isDragging ? ' dragging' : ''}${isOver ? ' _over' : ''}${(role == 'parent' && data?.length == 0) ? ' _empty' : ''}${focus?.id == id ? ' focus' : ''}`;

  const handleFocusClick = (event: any) => {

    event.preventDefault();
    event.stopPropagation();

    setFocus && setFocus(focus?.id == id ? null : { id });

  }

  const handleButtonClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    deleteItem(props);
  }


  return (
    <div className={className} id={id} ref={ref} tabIndex={position} onClick={handleFocusClick}>
      {
        focus?.id == id && <div className={isDragging ? 'dd-toolbar hidden' : 'dd-toolbar'}>
          <button type="button" onClick={handleButtonClick}>delete</button>
        </div>
      }
      {
        role == 'parent' ?
          <div className={`dd-content`}>
            {
              children ? children : <Render data={[...data]} />
            }
          </div>
          : <div className={`dd-content`}>{name}</div>
      }
    </div>
  );
};
