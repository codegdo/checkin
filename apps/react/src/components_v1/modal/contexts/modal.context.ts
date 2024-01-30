import { createContext } from "react";
import { useModalState } from "../hooks";
export type ContextValue = ReturnType<typeof useModalState>
export const ModalContext = createContext<ContextValue | null>(null);