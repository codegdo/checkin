import React, { FC, useRef, MouseEvent } from 'react';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

import { DragDropItem } from './dragdrop.item';
import { Render } from './dragdrop.render';
import { BoundingClientRect } from '../../helpers';

export const DragDropBlock: FC<any> = (props): JSX.Element => {

  const {
    id,
    className = '',
    role,
    name,
    position,
    data,
    current,
    item,
    setItem,
    children
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  const onChange = () => { }

  const onClick = (event: MouseEvent<HTMLElement, MouseEvent> & {
    target: { name: string | undefined }
  }) => {
    const { name } = event.target;

    switch (name) {
      case 'cancel':
        setItem(null);
        break;
      default:
        setItem(null);
    }
  };

  const handleClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    let boundingClientRect = null;

    if (ref && ref.current) {
      boundingClientRect = ref.current.getBoundingClientRect() as BoundingClientRect;
    }

    console.log(boundingClientRect);

    if (item?.id == id) {
      setItem(null);
    } else {
      setItem({
        id,
        type: role,
        position,
        //list,
        //values,
        isEdit: false,
        onChange,
        onClick
      });
    }
  }

  const events = (role == 'block') ? {
    onClick: handleClick
  } : {};

  return <div ref={ref} className={`block ${className}`} {...events}>
    {
      name == 'component' ?
        <>
          {
            parse(
              DOMPurify.sanitize(((typeof props.value === 'string') ? JSON.parse(props.value) : props.value).value, { ADD_TAGS: ['jsx'] }), {
              replace: (domNode): JSX.Element | null => {

                if ('attribs' in domNode) {
                  const { attribs } = domNode;

                  if (attribs.id) {
                    const [name, key] = attribs.id.split('_');
                    const items = data.filter((item: any) => item.holderId == key);

                    if (name == 'dropholder') {
                      return <DragDropItem
                        id={`${id}_${key}`}
                        name='block'
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
                  return null;
                }
                return null;
              }
            })
          }
        </> :
        <>{children ? children : <Render data={[...data]} />}</>
    }
  </div>
};
