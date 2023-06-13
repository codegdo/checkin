import React, { PropsWithChildren } from 'react';
import { Field } from '../types';

type ItemPlaceholderProps = PropsWithChildren<Field & {
  ctx: string;
}>;

function ItemPlaceholder(props: ItemPlaceholderProps) {
  return (
    <div>
      {
        props.children
      }
    </div>
  )
}

export default ItemPlaceholder;