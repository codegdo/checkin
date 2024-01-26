import { createContext } from "react";
import { useGridViewState } from "../hooks";
export type ContextValue = ReturnType<typeof useGridViewState>
export const GridViewContext = createContext<ContextValue | null>(null);