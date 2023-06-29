
import DropMenu from './drop.menu';
import DropEditor from './drop.editor';
import { Field } from '../types';

type DropGridProps = Field & {
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