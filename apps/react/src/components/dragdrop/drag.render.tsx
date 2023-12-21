import { useWrapperContext } from "@/hooks";
import DragDropContext from "./dragdrop.provider";
import DragField from "./drag.field";
import DragElement from "./drag.element";
import { dndHelper } from "./helpers";

function DragRender() {
  const context = useWrapperContext(DragDropContext);
  const { props } = context;

  const renderDragElements = () => {
    if (!props?.drags) return null;

    const dragElements = dndHelper.createDragElements(props.drags);

    return (
      <div className="drag-elements">
        {dragElements.map((item, index) => (
          <DragElement key={index} {...item} context={context} />
        ))}
      </div>
    );
  };

  const renderDragFields = () => {
    if (!props?.dragData) return null;

    return (
      <div className="drag-fields">
        {props.dragData.map((item, index) => (
          <DragField key={index} {...item} context={context} />
        ))}
      </div>
    );
  };

  return (
    <div className="draggable-area">
      {renderDragElements()}
      {renderDragFields()}
    </div>
  );
}

export default DragRender;
