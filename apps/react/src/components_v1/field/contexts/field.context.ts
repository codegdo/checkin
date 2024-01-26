import { createContext } from "react";
import { useFieldState } from "../hooks";
export type ContextValue = ReturnType<typeof useFieldState>
export const FieldContext = createContext<ContextValue | null>(null);
export const FieldProvider = FieldContext.Provider;