import { PropsWithChildren } from 'react';

import { Field } from '../types';
import { DndContextValue } from './types';

type ItemAreaProps = PropsWithChildren<Field & {
  ctx: DndContextValue;
}>;


function ItemArea(props: ItemAreaProps) {

  return (
    <div>
      {
        props.children
      }
    </div>
  )
}

export default ItemArea;