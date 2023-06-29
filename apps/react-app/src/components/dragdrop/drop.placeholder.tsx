import { PropsWithChildren } from 'react';
import { Field } from '../types';

type DropPlaceholderProps = PropsWithChildren<Field & {
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