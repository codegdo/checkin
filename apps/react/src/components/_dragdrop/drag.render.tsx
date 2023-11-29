
import { useWrapperContext } from '../../hooks';
import DragDropContext from './dragdrop.provider';

import DragItem from './drag.item';
import { DndField } from './types';

interface DragRenderProps {
  data?: DndField[];
}

function DragRender({ data = [] }: DragRenderProps) {
  const ctx = useWrapperContext(DragDropContext);

  return (
    <div className="drag-area">
      {
        data.map((item, index) => {
          return <DragItem key={index} {...item} ctx={ctx} />
        })
      }
    </div>
  );
}

export default DragRender;