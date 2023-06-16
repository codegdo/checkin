
import ItemMenu from './item.menu';
import ItemEditor from './item.editor';
import { Field } from '../types';

type ItemGridProps = Field & {
  ctx: string;
};

function ItemGrid(_props: ItemGridProps) {

  return (
    <>
      <ItemMenu />
      <ItemEditor />
    </>
  )
}

export default ItemGrid;