
import ItemMenu from './item.menu';
import ItemEditor from './item.editor';
import { Field } from '../types';

type ItemElementProps = Field & {
  ctx: string;
};

function ItemElement(_props: ItemElementProps) {

  return (
    <>
      <ItemMenu />
      <ItemEditor />
    </>
  )
}

export default ItemElement;