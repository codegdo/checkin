
import DropMenu from './drop.menu';
import DropEditor from './drop.editor';
import { DndField } from './types';

type DropGridProps = DndField & {
  ctx: string;
};

function DropGrid(_props: DropGridProps) {

  return (
    <>
      <DropMenu />
      <DropEditor />
    </>
  )
}

export default DropGrid;