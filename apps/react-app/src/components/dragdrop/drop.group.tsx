
import DropMenu from './drop.menu';
import Dropditor from './drop.editor';
import { Field } from '../types';

type DropGroupProps = Field & {
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