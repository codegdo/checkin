import { PropsWithChildren } from 'react';
import { DndField } from './types';

type DropPlaceholderProps = PropsWithChildren<DndField & {
  ctx: string;
}>;

function DropPlaceholder(props: DropPlaceholderProps) {
  return (
    <div>
      {
        props.children
      }
    </div>
  )
}

export default DropPlaceholder;