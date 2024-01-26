import { createContext } from "react";
import { useFormState } from "../hooks";
export type ContextValue = ReturnType<typeof useFormState>
export const FormContext = createContext<ContextValue | null>(null);
