import { useWrapperContext } from "@/hooks";
import { ContextValue, FormContextApi } from "../form.api";

export const useFormContextApi = (key: keyof ContextValue) => {
    const context = useWrapperContext(FormContextApi) as ContextValue;
    return context[key]();
  }