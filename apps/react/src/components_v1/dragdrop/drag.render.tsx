
import { ContextValue } from "./contexts";
import { useDragDropContext } from "./hooks";
import { DragField } from "./drag.field";
import { DragElement } from "./drag.element";

export function DragRender() {
  const { options } = useDragDropContext() as ContextValue;

  return (
    <div>
      {
        options.drags ? Object.keys(options.drags).map((key) => (
          <div key={key}>
            {
              options.drags[key]?.map((drag) => {
                return key === 'element' ? <DragElement {...drag} context={context}/> : <DragField {...drag} context={context}/>;
              })
            }
          </div>
        )) : <div>No drags</div>
      }
    </div>
  );
}
