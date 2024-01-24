import { ContextApi, ContextValue } from "@/contexts";
import { useWrapperContext } from "@/hooks";

export const useApi = <T>(key?: keyof ContextValue): ContextValue | T => {
  const context = useWrapperContext(ContextApi) as ContextValue;

  if (!key || !(key in context)) {
    console.error(`Key '${key}' either not found in the context.`);
    return context;
  }

  const value = context[key];

  if (typeof value === 'function') {
    return (value as () => T)();
  }

  return value as T;
};

export const useAsyncApi = async <T>(key?: keyof ContextValue): Promise<ContextValue | T> => {
  const context = useWrapperContext(ContextApi) as ContextValue;

  if (!key || !(key in context)) {
    console.log(`Key '${key}' either not found in the context.`);
    return context;
  }

  const value = context[key];

  if (typeof value === 'function') {
    const result = await (value as () => Promise<T>)();
    return result;
  }

  return value as T;
};
