import { ContextApi, ContextValue } from "@/contexts";
import { useWrapperContext } from "@/hooks";

export const useApi = <T>(key: keyof ContextValue): T => {
  const context = useWrapperContext(ContextApi) as ContextValue;

  if (!(key in context)) {
    throw new Error(`Key '${key}' either not found in the context.`);
  }

  const value = context[key];

  if (typeof value === 'function') {
    return (value as () => T)();
  }

  return value as T;
};

export const useAsyncApi = async <T>(key: keyof ContextValue): Promise<T> => {
  const context = useWrapperContext(ContextApi) as ContextValue;

  if (!(key in context)) {
    throw new Error(`Key '${key}' either not found in the context.`);
  }

  const value = context[key];

  if (typeof value === 'function') {
    const result = await (value as () => Promise<T>)();
    return result;
  }

  return value as T;
};
