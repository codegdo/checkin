import { useWrapperContext } from "@/hooks";
import DragDropContext from "./dragdrop.provider";
import { ActionType } from "./types";

function DropDropToolbar() {

  const { props, dispatch } = useWrapperContext(DragDropContext);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, name: keyof typeof ActionType) => {
    event.stopPropagation();

    switch (name) {
      case ActionType.REDO_STEP:
        dispatch({ type: name });
        break;
      case ActionType.UNDO_STEP:
        dispatch({
          type: name,
          payload: {
            dataSource: props.data
          }
        });
        break;
      default:
    }
  };

  return <div>
    <button type="button" onClick={(e) => handleClick(e, ActionType.REDO_STEP)}>redo</button>
    <button type="button" onClick={(e) => handleClick(e, ActionType.UNDO_STEP)}>undo</button>
  </div>
}

export default DropDropToolbar;