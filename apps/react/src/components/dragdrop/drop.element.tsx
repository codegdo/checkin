import { classNames } from "@/utils";
import { DndField } from "./types";
import { useDragDrop } from "./hooks";
import { DndContextValue } from "./dragdrop.provider";

type DropElementProps = DndField & {
    context: DndContextValue;
  };
  
  function DropElement({ context, ...item }: DropElementProps) {
    const { ref, isOver, drag, drop } = useDragDrop({ context, item });
    const className = classNames('drop-item', {
      'is-over': isOver
    });
  
    drag(drop(ref));
  
    return (
      <div className={className} data-id={`${item.id}`} ref={ref}>
        <label>{`${item.name} ${item.id}`}</label>
      </div>
    )
  }
  
  export default DropElement;