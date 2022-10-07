import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

import { dragdropHelper } from '../../helpers';
import { Render } from './dragdrop.render';

export const DragDropItem: React.FC<any> = (props): JSX.Element => {

  const {
    id,
    type,
    role,
    name,
    className,
    position,
    data,
    value,
    draggable = true,
    parentId,
    holderId,
    focus,
    current,
    setFocus,
    moveItem,
    deleteItem,
    duplicateItem,
    children } = props;
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
      accept: ['block', 'component', 'dropstage', 'dropholder', 'element', 'field'],
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
            (role === 'dropstage' && item.list.length !== 0) // if dropstage has children prevent the drop
          ) {
            current.drop = null;
            return;
          }

          if (current.drop == null || current.drop.id !== props.id) {
            current.drop = { id, type, role, data, position, parentId, holderId, x: 0, y: 0, isOver: false };
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

    switch (event.target.value) {
      case 'delete':
        deleteItem(props);
        break;
      case 'duplicate':
        duplicateItem(props);
        break;
    }
  }

  const handleMouseOver = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (ref.current) {
      ref.current.classList.add('-hover');
      ref.current.removeAttribute('style');
    }
  }

  const handleMouseOut = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (ref.current) {
      ref.current.classList.remove('-hover');
    }
  }

  const classString = `${className || ''}${role == 'block' ? ' dd-block' : ' dd-field'}${isDragging ? ' dragging' : ''}${isOver ? ' -over' : ''}${(role == 'block' && data?.length == 0) ? ' -empty' : ''}${focus?.id == id ? ' -focus' : ''}`;
  const title = (role == 'element' || role == 'field') ? type : role;
  const events = !!draggable ? {
    onClick: handleFocusClick,
    onMouseOver: handleMouseOver,
    onMouseOut: handleMouseOut
  } : {};

  drag(drop(ref));

  return (
    <div className={classString} id={id} ref={ref} tabIndex={position} data-title={title} {...events}>
      {
        focus?.id == id && <div className={isDragging ? 'dd-toolbar hidden' : 'dd-toolbar'}>
          <button type="button" value="delete" onClick={handleButtonClick}>delete</button>
          <button type="button" value="duplicate" onClick={handleButtonClick}>duplicate</button>
        </div>
      }
      <div className={`dd-content`}>
        {
          (() => {
            switch (role) {
              case 'block':
              case 'dropstage':
              case 'dropholder':
                return children ? children : <Render data={[...data]} />
              case 'component':
                const html = DOMPurify.sanitize(value, { ADD_TAGS: ['jsx'] });

                return parse(html, {
                  replace: (domNode): any => {
                    if ('attribs' in domNode) {
                      const { attribs } = domNode;

                      if (attribs.id) {
                        const [name, key] = attribs.id.split('_');

                        const items = data.filter((i: any) => i.holderId == key);

                        if (name == 'dropholder') {
                          return <DragDropItem
                            id={`${id}_${key}`}
                            type='div'
                            role='dropholder'
                            current={current}
                            position={position}
                            draggable={false}
                            parentId={id}
                            holderId={key}
                            data={items}
                          />
                        }
                      }

                    }
                  }
                })
              case 'element':
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
