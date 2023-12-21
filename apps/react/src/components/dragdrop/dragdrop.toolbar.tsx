import { useWrapperContext } from "@/hooks";
import DragDropContext from "./dragdrop.provider";
import { ActionType } from "./types";

function DropDropToolbar() {

  const { dispatch } = useWrapperContext(DragDropContext);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const target = e.target as Element;
    const clickedElement = target.closest('button');

    if (clickedElement) {
      const name = clickedElement.getAttribute('name') as keyof typeof ActionType;

      switch (name) {
        case ActionType.REDO_STEP:
          dispatch({ type: name });
          break;
        case ActionType.UNDO_STEP:
          dispatch({ type: name });
          break;
        default:
      }
    }
  };

  return <div onClick={handleClick}>
    <button type="button" name={ActionType.REDO_STEP}>redo</button>
    <button type="button" name={ActionType.UNDO_STEP}>undo</button>
  </div>
}

export default DropDropToolbar;