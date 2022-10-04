import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import parse, { HTMLReactParserOptions } from 'html-react-parser';
import DOMPurify from 'dompurify';

import { dragdropHelper } from '../../helpers';
import { Render } from './dragdrop.render';

export const DragDropItem: React.FC<any> = (props): JSX.Element => {

  const { id, type, role, name, position, data, value, parentId, focus, current, setFocus, moveItem, deleteItem, children } = props;
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: role,
      item: { ...props },
      canDrag: () => {
        if (ref.current) {
          //setFocus && setFocus(null);
          preview(getEmptyImage(), { captureDraggingState: false });

          const ddContent = ref.current.childNodes[0] as HTMLElement;

          if (ddContent) {
            ddContent.classList.remove('-hover')
          };
        }
        return (id == 'dropstage') ? false : true;
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
      accept: ['parent', 'component', 'block', 'field'],
      drop: () => {
        if (ref.current) {
          ref.current.style.transition = 'none';
          ref.current.classList.remove('-hover');
        }
      },
      hover: (item: any, monitor) => {

        // current over
        if (monitor.isOver({ shallow: true })) {

          if (!ref.current || id === 'dropstage' || item.id === id) {
            current.drop = null;
            return;
          }

          if (current.drop == null || current.drop.id !== props.id) {
            current.drop = { id, type, role, data, position, parentId, x: 0, y: 0, isOver: false };
          }

          dragdropHelper.onHover(monitor, ref, current);

        }
      },
      collect: monitor => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    }), [id, moveItem]);


  const handleFocusClick = (event: any) => {

    event.preventDefault();
    event.stopPropagation();

    setFocus && setFocus(focus?.id == id ? null : { id, isDragging });

  }

  const handleButtonClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    deleteItem(props);
  }

  const handleMouseOver = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.target.classList.contains('dd-content')) {
      event.target.classList.add('-hover');
    }
  }

  const handleMouseOut = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.classList.contains('dd-content')) {
      event.target.classList.remove('-hover');
    }
  }

  const className = `${role == 'parent' ? 'dd-block' : 'dd-field'}${isDragging ? ' dragging' : ''}${isOver ? ' -over' : ''}${(role == 'parent' && data?.length == 0) ? ' -empty' : ''}${focus?.id == id ? ' focus' : ''}`;

  drag(drop(ref));

  return (
    <div className={className} id={id} ref={ref} tabIndex={position} data-type={type} onClick={handleFocusClick}>
      {
        focus?.id == id && <div className={isDragging ? 'dd-toolbar hidden' : 'dd-toolbar'}>
          <button type="button" onClick={handleButtonClick}>delete</button>
        </div>
      }
      <div className={`dd-content`} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        {
          (() => {
            switch (role) {
              case 'parent':
                return children ? children : <Render data={[...data]} />
              case 'component':
                return <>{parse(value)}</>
              case 'block':
                return <>{name}</>
              case 'field':
                return <>{name}</>
              default: return null;
            }
          })()
        }
      </div>
    </div>
  );
};
