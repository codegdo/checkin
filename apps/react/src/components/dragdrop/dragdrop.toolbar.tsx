import { useWrapperContext } from "@/hooks";
import DragDropContext from "./dragdrop.provider";
import { ActionType } from "./reducers";

interface IProps {
}

function DropDropToolbar() {

  const { dispatch } = useWrapperContext(DragDropContext);

  const handleRedo = () => {
    dispatch({
      type: ActionType.REDO_STEP,
    });
  }

  const handleUndo = () => {
    dispatch({
      type: ActionType.UNDO_STEP,
    });
  }

  return <div>
    <button type="button" onClick={handleRedo}>redo</button>
    <button type="button" onClick={handleUndo}>undo</button>
  </div>
}

export default DropDropToolbar;