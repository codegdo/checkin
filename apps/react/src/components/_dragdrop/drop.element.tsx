
import DropMenu from './drop.menu';
import DropEditor from './drop.editor';
import { DndField } from './types';

type DropElementProps = DndField & {
  ctx: string;
};

function DropElement(_props: DropElementProps) {

  return (
    <>
      <DropMenu />
      <DropEditor />
    </>
  )
}

export default DropElement;