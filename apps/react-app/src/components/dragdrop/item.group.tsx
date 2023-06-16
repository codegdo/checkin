
import ItemMenu from './item.menu';
import ItemEditor from './item.editor';
import { Field } from '../types';

type ItemGroupProps = Field & {
  ctx: string;
};

function ItemGroup(_props: ItemGroupProps) {

  return (
    <>
      <ItemMenu />
      <ItemEditor />
    </>
  )
}

export default ItemGroup;