import { useWrapperContext } from "@/hooks"
import { GridViewContext } from "../contexts";

export const useGridViewContext = () => {
  return useWrapperContext(GridViewContext);
}