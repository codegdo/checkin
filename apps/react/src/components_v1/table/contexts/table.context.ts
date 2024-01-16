import { createContext } from "react";
import { useTableState } from "../hooks";
export type ContextValue = ReturnType<typeof useTableState>
export const TableContext = createContext<ContextValue | null>(null);
export const TableProvider = TableContext.Provider;