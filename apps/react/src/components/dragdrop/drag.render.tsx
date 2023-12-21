import { useWrapperContext } from "@/hooks";
import { DragType, Field } from "./types";
import DragDropContext from "./dragdrop.provider";
import DragField from "./drag.field";
import DragElement from "./drag.element";
import { dndHelper } from "./helpers";



interface IProps {
  dragData?: Field[];
  drags?: (DragType | Field)[];
}

function DragRender({ dragData = [], drags = [] }: IProps) {
  const context = useWrapperContext(DragDropContext);
  const dragElementArray = dndHelper.createElementObjects(drags);
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