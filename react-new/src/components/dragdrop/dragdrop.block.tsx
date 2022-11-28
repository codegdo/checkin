import React, { FC } from 'react';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

import { DragDropItem } from './dragdrop.item';
import { Render } from './dragdrop.render';

export const DragDropBlock: FC<any> = (props): JSX.Element => {
  const {
    id,
    className = '',
    role,
    name,
    position,
    data,
    current,
    item: targetItem,
    setItem,
    children
  } = props;

  const onChange = () => { }

  const onClick = () => { }

  const handleClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (targetItem && targetItem.id == id) {
      setItem(null);
    } else {
      setItem({
        id,
        type: role,
        position,
        //list,
        //values,
        onChange,
        onClick
      });
    }
  }

  const events = (role == 'block') ? {
    onClick: handleClick
  } : {};

  return <div className={`block ${className}`} {...events}>
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
