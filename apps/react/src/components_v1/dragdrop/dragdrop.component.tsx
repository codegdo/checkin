import { DragDropProvider } from "./contexts";
import { CustomField, DragDropReturn } from "./types";
import { useDragDropState } from "./hooks";


interface IDragDropProps {
  title?: string;
  data?: CustomField[];
  status?: string;
  onSubmit?: (returnData: DragDropReturn) => void;
}

export function DragDrop({ status, onSubmit }: IDragDropProps) {
  const contextValue = useDragDropState({ status, callback: onSubmit });
  return (
    <DragDropProvider value={contextValue}></DragDropProvider>
  )
}