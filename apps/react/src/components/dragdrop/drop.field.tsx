import { classNames } from "@/utils";
import { DndField } from "./types";
import { useDragDrop } from "./hooks";
import { DndContextValue } from "./dragdrop.provider";

type DropBlockProps = DndField & {
    context: DndContextValue;
  };
  
  function DropField({ context, ...item }: DropBlockProps) {
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
  
  export default DropField;