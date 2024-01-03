import { useDragDropContext } from "./dragdrop.provider";
import DragField from "./drag.field";
import DragElement from "./drag.element";
import { dndHelper } from "./helpers";

function DragRender() {
  const context = useDragDropContext();
  const { props } = context;
  const { drags } = props;

  const renderDragElements = () => {
    if (!drags || !drags?.elements) return null;

    const dragElements = dndHelper.createDragElements(drags?.elements);

    return (
      <div className="drag-elements">
        {dragElements.map((item, index) => (
          <DragElement key={index} {...item} context={context} />
        ))}
      </div>
    );
  };

  const renderDragFields = () => {
    if (!drags || !drags?.fields) return null;

    return (
      <div className="drag-fields">
        {drags.fields.map((item, index) => (
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
