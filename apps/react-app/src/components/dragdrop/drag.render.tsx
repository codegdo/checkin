
//import { useWrapperContext } from '../../hooks';
//import DragDropContext from './dragdrop.provider';

import DragItem from './drag.item';
import { DragField } from '../types';

interface DragRenderProps {
  data?: DragField[];
}

function DragRender(_props: DragRenderProps) {
  //const _ctx = useWrapperContext(DragDropContext);

  return (
    <div className="drag-area">
      <DragItem />
    </div>
  );
}

export default DragRender;