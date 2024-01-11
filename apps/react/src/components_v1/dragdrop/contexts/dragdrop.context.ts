import { createContext } from "react";
import { useDragDropState } from "../hooks";

export type ContextValue = ReturnType<typeof useDragDropState>

export const DragDropContext = createContext<ContextValue | null>(null);
export const DragDropProvider = DragDropContext.Provider;