import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

import { dragdropHelper } from '../../helpers';
import { Render } from './dragdrop.render';

export const DragDropItem: React.FC<any> = (props): JSX.Element => {

  const { id, type, role, name, className, position, data, value, draggable = true, parentId, focus, current, setFocus, moveItem, deleteItem, children } = props;
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: role,
      item: { ...props },
      canDrag: () => {
        if (ref.current) {
          //setFocus && setFocus(null);
          preview(getEmptyImage(), { captureDraggingState: false });

          ref.current.classList.remove('-hover');
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
    [id, moveItem]
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ['parent', 'group', 'block', 'field'],
      drop: () => {
        if (ref.current) {
          ref.current.style.transition = 'none';
          ref.current.classList.remove('-hover');
        }
      },
      hover: (item: any, monitor) => {

        // current over
        if (monitor.isOver({ shallow: true })) {

          if (
            !ref.current ||
            item.id === id ||
            id === 'dropstage'
          ) {
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

    !!draggable && (setFocus && setFocus(focus?.id == id ? null : { id, isDragging }));

  }

  const handleButtonClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    deleteItem(props);
  }

  const handleMouseOver = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (ref.current) {
      ref.current.classList.add('-hover');
    }
  }

  const handleMouseOut = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (ref.current) {
      ref.current.classList.remove('-hover');
    }
  }

  const classString = `${className || ''}${role == 'parent' ? ' dd-block' : ' dd-field'}${isDragging ? ' dragging' : ''}${isOver ? ' -over' : ''}${(role == 'parent' && data?.length == 0) ? ' -empty' : ''}${focus?.id == id ? ' -focus' : ''}`;

  const events = !!draggable ? {
    onClick: handleFocusClick,
    onMouseOver: handleMouseOver,
    onMouseOut: handleMouseOut
  } : {};

  drag(drop(ref));

  return (
    <div className={classString} id={id} ref={ref} tabIndex={position} data-title={name} {...events}>
      {
        focus?.id == id && <div className={isDragging ? 'dd-toolbar hidden' : 'dd-toolbar'}>
          <button type="button" onClick={handleButtonClick}>delete</button>
        </div>
      }
      <div className={`dd-content`}>
        {
          (() => {
            switch (role) {
              case 'parent':
                return children ? children : <Render data={[...data]} />
              case 'group':
                const html = DOMPurify.sanitize(value, { ADD_TAGS: ['jsx'] });


                return parse(html, {
                  replace: (domNode): any => {
                    if ('attribs' in domNode) {
                      const { attribs } = domNode;

                      if (attribs.id) {
                        const [name, key] = attribs.id.split('_');

                        const items = data.filter((i: any) => i.groupId == key);

                        if (name == 'placeholder') {
                          return <DragDropItem
                            id={`${id}_${key}`}
                            className={attribs.class}
                            type='placeholder'
                            role='parent'
                            current={current}
                            position={null}
                            draggable={false}
                            parentId={id}
                            data={items}
                          />
                        }
                      }

                    }
                  }
                })
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
