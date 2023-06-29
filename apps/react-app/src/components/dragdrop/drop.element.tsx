
import DropMenu from './drop.menu';
import DropEditor from './drop.editor';
import { Field } from '../types';

type DropElementProps = Field & {
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