import { useWrapperContext } from "@/hooks"
import { FormContext } from "../contexts";

export const useFormContext = () => {
  return useWrapperContext(FormContext);
}