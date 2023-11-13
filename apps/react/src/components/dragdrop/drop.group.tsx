
import DropMenu from './drop.menu';
import Dropditor from './drop.editor';
import { DndField } from './types';

type DropGroupProps = DndField & {
  ctx: string;
};

function DropGroup(_props: DropGroupProps) {

  return (
    <>
      <DropMenu />
      <Dropditor />
    </>
  )
}

export default DropGroup;