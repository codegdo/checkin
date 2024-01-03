import { useDragDropContext } from "./dragdrop.provider";
import { ActionType } from "./types";

function DropDropToolbar() {

  const { props, state, dispatch } = useDragDropContext();

  const handleRedoClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch({ type: ActionType.REDO_STEP });

  };

  const handleUndoClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch({
      type: ActionType.UNDO_STEP,
      payload: {
        dataSource: props.data
      }
    });
  };

  return <div>
    <button
      type="button"
      disabled={(state.historyIndex === -1 && state.historyData.length === 0) || state.historyIndex === state.historyData.length - 1}
      onClick={handleRedoClick}
      title="Redo Action"
    >
      Redo
    </button>
    <button
      type="button"
      disabled={state.historyIndex === -1}
      onClick={handleUndoClick}
      title="Undo Action"
    >
      Undo
    </button>
  </div>
}

export default DropDropToolbar;