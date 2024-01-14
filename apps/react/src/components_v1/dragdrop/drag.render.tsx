import { ContextValue } from "./contexts";
import { useDragDropContext } from "./hooks";

export function DragRender() {
  const {options} = useDragDropContext() as ContextValue;
  
  return (
    <div>
      {
        Object.keys(options.drags || {}).map((key) => (
          <div key={key}>
            {key}
            {/* {options.drags[key].map((element) => (
              <></>
            ))} */}
          </div>
        ))
      }
    </div>
  );
}