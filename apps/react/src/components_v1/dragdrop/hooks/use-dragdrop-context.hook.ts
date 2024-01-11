import { useWrapperContext } from "@/hooks"
import { DragDropContext } from "../contexts";

export const useDragDropContext = () => {
  return useWrapperContext(DragDropContext);
}