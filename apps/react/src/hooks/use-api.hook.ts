import { ContextApi, ContextValue } from "@/contexts";
import { useWrapperContext } from "@/hooks";

export const useApi = <T>(key: keyof ContextValue): T => {
  const context = useWrapperContext(ContextApi) as ContextValue | null;

  if (context && key in context && typeof context[key] === 'function') {
    return context[key]() as T;
  } else {
    throw new Error(`Key '${key}' either not found or not a function in the context.`);
  }

  // if (context) {
  //   return context.getApi() as T;
  // } else {
  //   throw new Error(`Context value or getApi function not found!`);
  // }
};
