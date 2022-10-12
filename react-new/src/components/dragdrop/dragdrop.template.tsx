import React, { FC } from 'react';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

import { DragDropItem } from './dragdrop.item';

export const DragDropTemplate: FC<any> = (props): JSX.Element => {
  const {
    id,
    position,
    data,
    value,
    current, } = props;
  const html = DOMPurify.sanitize(value, { ADD_TAGS: ['jsx'] });

  return <>{
    parse(html, {
      replace: (domNode): JSX.Element | null => {

        if ('attribs' in domNode) {
          const { attribs } = domNode;

          if (attribs.id) {
            const [name, key] = attribs.id.split('_');

            const items = data.filter((item: any) => item.holderId == key);

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
          return null;
        }
        return null;
      }
    })
  }</>
};
