import { useWrapperContext } from "@/hooks";
import { Field } from "./types";
import DragDropContext from "./dragdrop.provider";
import DragField from "./drag.field";
import DragElement from "./drag.element";
import { dndHelper } from "./helpers";

export type DraggableElementType = 'section' | 'block' | 'button' | 'link' | 'text';

interface IProps {
  dragData?: Field[];
  dragElements?: (DraggableElementType | Field)[];
}

function DragRender({ dragData = [], dragElements = [] }: IProps) {
  const context = useWrapperContext(DragDropContext);
  const dragElementArray = dndHelper.createElementObjects(dragElements);
  return (
    <div className="draggable-area">
      <div className="drag-elements">
        {
          dragElementArray.map((item, index) => {
            return <DragElement key={index} {...item} context={context} />
          })
        }
      </div>
      <div className="drag-fields">
        {
          dragData.map((item, index) => {
            return <DragField key={index} {...item} context={context} />
          })
        }
      </div>
    </div>
  );
}

export default DragRender;